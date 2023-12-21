import json

from flask import (
            Blueprint, jsonify
)


from flaskr.db import get_db

bp = Blueprint('achievement', __name__)


@bp.route('/')
def index():
    db = get_db()
    names = db.execute('SELECT * from category').fetchall()

    results = [dict(row) for row in names]

    return {"members": ["Me1", "Me2", "Me3", "Me4", "Me5"]}