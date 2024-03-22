from sqlalchemy.orm import Session

from . import models, schemas


def get_categories(db: Session):
    return db.query(models.Category).all()


def get_achievements(db: Session):
    return db.query(models.Achievement).all()


