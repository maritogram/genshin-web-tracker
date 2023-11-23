from flask import (
            Blueprint, flash, g, redirect, render_template, request, url_for
)

from werkzeug.exceptions import abort

from flaskr.db import get_db

bp = Blueprint('achievement', __name__)

@bp.route('/')
def index():
    db = get_db()
    names = db.execute('SELECT (title) from category').fetchall()
    return render_template('index.html', names=names)

