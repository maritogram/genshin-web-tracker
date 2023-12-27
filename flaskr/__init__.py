import os

from flask import (Flask, jsonify)
from . import db
from flaskr.db import get_db



def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed inh
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    db.init_app(app)


    @app.route('/api/catalog')
    def show_catalog():
        database = get_db()
        names = database.execute('SELECT * from category').fetchall()

        results = [dict(row) for row in names]

        return jsonify(results)

    @app.route('/api/category/<int:category_id>')
    def show_category(category_id):
        database = get_db()
        names = database.execute(f"SELECT * from achievement where category_id = {category_id}").fetchall()

        results = [dict(row) for row in names]

        return jsonify(results)

    return app