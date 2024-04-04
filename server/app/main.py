import os.path

from fastapi import FastAPI, Depends, Request

from mangum import Mangum

from . import crud, schemas
from .database import SessionLocal

from sqlalchemy.orm import Session

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Welcome": "Welcome to the FastAPI on Lambda"}


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get('/api/categories/', response_model=list[schemas.Category])
def get_category(db: Session = Depends(get_db)):
    return crud.get_categories(db)


@app.get('/api/achievements/', response_model=list[schemas.Achievement])
def get_achievement(db: Session = Depends(get_db)):
    return crud.get_achievements(db)


@app.get('/update_db/')
def update_db(db: Session = Depends(get_db)):
    return crud.update_db(db)


handler = Mangum(app)
