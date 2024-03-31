import logging

import os
from dotenv import load_dotenv
import boto3

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

load_dotenv()

if os.environ.get("AWS_LAMBDA_FUNCTION_NAME") is not None:
    logging.info("Code is running on AWS Lambda.")

    SQLALCHEMY_DATABASE_URL = os.environ.get("AWS_DATABASE_URL")
    if not os.path.isfile('/tmp/achievement.db'):
        try:
            s3 = boto3.resource('s3')
            s3.meta.client.download_file('mygenshinbucket', 'achievement.db', '/tmp/achievement.db')
        except Exception as e:
            logging.error("Could not download achievement fromm AWS S3. Reason: " + str(e))
else:
    logging.info("Code is running on local machine.")
    SQLALCHEMY_DATABASE_URL = os.environ.get("AWS_DATABASE_URL")

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={'check_same_thread': False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
