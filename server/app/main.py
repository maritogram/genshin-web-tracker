from fastapi import FastAPI, Depends, HTTPException

from . import crud, models, schemas
from .database import SessionLocal, engine

from sqlalchemy.orm import Session

app = FastAPI()


# dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get('/categories/', response_model=list[schemas.Category])
def get_category(db: Session = Depends(get_db)):
    return crud.get_categories(db)


@app.get('/achievements/', response_model=list[schemas.Achievement])
def get_achievement(db: Session = Depends(get_db)):
    return crud.get_achievements(db)


@app.get('/update_db/')
def update_db(db: Session = Depends(get_db)):
    return crud.update_db(db)
