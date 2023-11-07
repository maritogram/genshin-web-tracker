import sqlite3

import click
from flask import current_app, g

import re
from bs4 import BeautifulSoup
import requests


def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(
            current_app.config['DATABASE'],
            detect_types=sqlite3.PARSE_DECLTYPES
        )
        g.db.row_factory = sqlite3.Row

    return g.db


def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()


def init_db():
    db = get_db()

    with current_app.open_resource('schema.sql') as f:
        db.executescript(f.read().decode('utf8'))

    def get_page(page_link):
        # first we get the response from the webpage with a get request
        page = requests.get(page_link)

        # then we extract the responses html and parse it
        parsed = BeautifulSoup(page.text, "html.parser")

        return parsed

    main_page = get_page("https://genshin-impact.fandom.com/wiki/Achievement")

    # find the table that contains the achievement divisions I want, in this case its the first one
    list_achievements = main_page.find("table")

    cur = db.cursor()

    for row in list_achievements.find_all("tr"):
        # Check if the first row contains heading, if so, continue to next row
        if row.th:
            continue
        # grab the title of the row
        title = row.td.next_sibling.next_sibling
        # grab the total achievement
        total_achievements = title.next_sibling.next_sibling
        # grab the total primos
        total_primos = total_achievements.next_sibling.next_sibling

        cur.execute(
            "INSERT INTO category(title, quantity, primos) VALUES(?,?,?) ON CONFLICT DO NOTHING",
            (
                title.text.strip(),
                re.sub(",", "", total_achievements.text.strip(",")),
                re.sub(",", "", total_primos.text.strip(",")),
            ),
        )

        db.commit()

        cur.execute("select cat_id from category where title=?", (title.text.strip(),))
        id_for = cur.fetchone()[0]

        # NOW GET THE INFO OF THE ACTUAL ACHIEVEMENTS

        # merge the href with the source domain to create the actual link for the achievements info
        link = "https://genshin-impact.fandom.com" + title.a.get("href")

        # get the response and parse
        row_page = get_page(link)

        list_row = row_page.find("table")

        for cur_row in list_row.find_all("tr"):
            if cur_row.th:
                continue

            cur_title = cur_row.td
            cur_desc = cur_title.next_sibling.next_sibling
            cur_requirements = cur_desc.next_sibling.next_sibling
            cur_primos = cur_row.contents[-1]

            only_digit = re.sub("\D", "", cur_primos.text.strip())

            if only_digit == "":
                only_digit = 0

            cur.execute(
                "INSERT INTO achievement(name,description, requirements ,primos, category_id) VALUES(?,?,?,?,?) ON CONFLICT DO NOTHING",
                (
                    cur_title.text.strip(),
                    cur_desc.text.strip(),
                    cur_requirements.text.strip(),
                    only_digit,
                    id_for,
                ),
            )

        db.commit()

    cur.close()
    db.close()















@click.command('init-db')
def init_db_command():
    """Clear the existing data and create new tables."""
    init_db()
    click.echo('Initialized the database.')


def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)