import re
from bs4 import BeautifulSoup
import requests
import psycopg2


def getPage(pageLink):
    # first we get the response from the webpage with a get request
    page = requests.get(pageLink)

    # then we extract the responses html and parse it
    parsed = BeautifulSoup(page.text, "html.parser")

    return parsed


mainPage = getPage("https://genshin-impact.fandom.com/wiki/Achievement")

# find the table that contains the achievement divisions I want, in this case its the first one
listAchievements = mainPage.find("table")

# get credentials for database connection
dbName = input("Database name: ")
userName = input("User name: ")
password = input("Password: ")

dsn = f"dbname='{dbName}' user='{userName}' password='{password}'"

conn = psycopg2.connect(dsn)
cur = conn.cursor()


for row in listAchievements.find_all("tr"):
    # Check if the first row contains heading, if so, continue to next row
    if row.th:
        continue
    # grab the title of the row
    title = row.td.next_sibling.next_sibling
    # grab the total achievement
    totalAchievements = title.next_sibling.next_sibling
    # grab the total primosgi
    totalPrimos = totalAchievements.next_sibling.next_sibling

    cur.execute(
        "INSERT INTO category(title, quantity, primos) VALUES(%s,%s,%s) ON CONFLICT DO NOTHING",
        (
            title.text.strip(),
            re.sub(",", "", totalAchievements.text.strip(",")),
            re.sub(",", "", totalPrimos.text.strip(",")),
        ),
    )

    conn.commit()

    cur.execute("select cat_id from category where title=%s", (title.text.strip(),))
    idFor = cur.fetchone()[0]

    # NOW GET THE INFO OF THE ACTUAL ACHIEVEMENTS

    # merge the href with the source domain to create the actual link for the achievements info
    link = "https://genshin-impact.fandom.com" + title.a.get("href")

    # get the response and parse
    rowPage = getPage(link)

    listRow = rowPage.find("table")

    for curRow in listRow.find_all("tr"):
        if curRow.th:
            continue

        curTitle = curRow.td
        curDesc = curTitle.next_sibling.next_sibling
        curRequirements = curDesc.next_sibling.next_sibling
        curPrimos = curRow.contents[-1]

        onlyDigit = re.sub("\D", "", curPrimos.text.strip())

        if onlyDigit == "":
            onlyDigit = 0

        cur.execute(
            "INSERT INTO achievements(name,description, requirements ,primos, category_id) VALUES(%s,%s,%s,%s,%s) ON CONFLICT DO NOTHING",
            (
                curTitle.text.strip(),
                curDesc.text.strip(),
                curRequirements.text.strip(),
                onlyDigit,
                idFor,
            ),
        )

    conn.commit()

cur.close()
conn.close()