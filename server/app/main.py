import boto3
from fastapi import FastAPI, Depends

from mangum import Mangum

import uvicorn
from . import crud, schemas
from .database import SessionLocal

from sqlalchemy.orm import Session

app = FastAPI()



@app.get("/")
def read_root():
    return {"Welcome": "Welcome to the FastAPI on Lambda"}

# dependency
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


handle = Mangum(app)


