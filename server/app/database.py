import os
from dotenv import load_dotenv

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

load_dotenv()

if os.environ.get("AWS_LAMBDA_FUNCTION_NAME") is not None:
    SQLALCHEMY_DATABASE_URL = os.environ.get("AWS_DATABASE_URL")
else:
    SQLALCHEMY_DATABASE_URL = os.environ.get("MY_DATABASE_URL")

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={'check_same_thread': False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
