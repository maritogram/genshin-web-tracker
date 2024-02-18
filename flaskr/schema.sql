DROP TABLE IF EXISTS achievement;
DROP TABLE IF EXISTS category;

CREATE TABLE category (
    cat_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR NOT NULL,
    quantity INT NOT NULL,
    primos INT NOT NULL
);

CREATE TABLE achievement (
    ach_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    primos INT NOT NULL,
    category_id INT NOT NULL,
    requirements VARCHAR,
    multiprt INT NOT NULL,
    part INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES category (cat_id)
);