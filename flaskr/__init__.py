import os

from flask import Flask


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

    from . import db
    db.init_app(app)

    from . import achievement

    app.register_blueprint(achievement.bp)
    app.add_url_rule('/', endpoint='index')

    def font_sizer(title: str) -> str:

        title_words = title.split()

        if len(title_words[0]) < 17 and len(title) < 30:
            return "25px"
        elif len(title) < 41:
            return "24px"
        else:
            return "20px"

    app.jinja_env.globals.update(font_sizer=font_sizer)

    return app
