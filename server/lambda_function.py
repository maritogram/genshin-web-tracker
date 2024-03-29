import sys
import boto3

from app.main import handle


def handler(event, context):
    s3 = boto3.resource('s3')
    s3.meta.client.download_file('mygenshinbucket', 'achievement.db', '/tmp/achievement.db')

    return handle
