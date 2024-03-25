import re

from sqlalchemy import select

from sqlalchemy.orm import Session

from . import models, schemas

import requests

from bs4 import BeautifulSoup


def get_categories(db: Session):
    return db.query(models.Category).all()


def get_achievements(db: Session):
    return db.query(models.Achievement).all()


def update_db(db: Session):
    def get_page(page_link):
        # first we get the response from the webpage with a get request

        page = requests.get(page_link)

        # then we extract the responses html and parse it
        parsed = BeautifulSoup(page.text, "html.parser")

        return parsed

    main_page = get_page("https://genshin-impact.fandom.com/wiki/Achievement")

    # find the table that contains the achievement divisions I want, in this case its the first one
    list_achievements = main_page.find("table")

    for row in list_achievements.find_all("tr"):
        # Check if the first row contains heading, if so, continue to next row
        if row.th:
            continue

        # grab the title of the row
        title = row.td.next_sibling.next_sibling

        print("Collecting achievements from: {}".format(title.text))

        # grab the total achievement
        total_achievements = title.next_sibling.next_sibling




        # grab the total primos
        total_primos = total_achievements.next_sibling.next_sibling

        db.add(models.Category(title=title.text.strip(),
                               quantity=int(re.sub(",", "", total_achievements.text.strip(","))),
                               primos=int(re.sub(",", "", total_primos.text.strip(",")))))

        db.commit()
        # db.refresh(models.Category)

        id_for = db.execute(select(models.Category.cat_id).filter(models.Category.title == title.text.strip())).first()[0]

        print(id_for)
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
            # else:
            #     only_digit = int(only_digit)

            db.add(models.Achievement(name=cur_title.text.strip(), description=cur_desc.text.strip(), requirements=cur_requirements.text.strip(), primos=only_digit, category_id=id_for))

        db.commit()

    # # multipart achievement shit, I hate this. vvvvv
    # all_multiparts = cur.execute("""SELECT a.*
    #                                 FROM ACHIEVEMENT a
    #                                 JOIN(SELECT name, COUNT(name)
    #                                 FROM ACHIEVEMENT
    #                                 GROUP BY name
    #                                 HAVING COUNT(name) > 2 ) b
    #                                 ON a.name = b.name""").fetchall()
    #
    # print("\nMarking multipart achievements...")
    # for achievement in all_multiparts:
    #     # assuming all multiprt achievements are 3 part...
    #     cur_part = (all_multiparts.index(achievement) % 3) + 1
    #     cur.execute("UPDATE ACHIEVEMENT SET multiprt = 1, part = ? WHERE ach_id = ?", (cur_part, achievement[0]))
    #
    # db.commit()

    return {"status": "success"}

