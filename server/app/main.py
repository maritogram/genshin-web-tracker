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
    items = crud.get_categories(db)
    return items


@app.get('/achievements/')
def get_achievement():
    return {"Hello": "World"}

