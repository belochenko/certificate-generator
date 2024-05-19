from dotenv import dotenv_values
from loguru import logger
import os

path = os.getcwd()

config = dotenv_values(f'{path}/config/.env')

if(config['GOOGLE_CLIENT_ID'] != None and 
   config['GOOGLE_CLIENT_SECRET'] != None):
    
    GOOGLE_CLIENT_ID = config['GOOGLE_CLIENT_ID']
    GOOGLE_CLIENT_SECRET = config['GOOGLE_CLIENT_SECRET']

else:
    logger.error("Load Google SSO API credentials!")
