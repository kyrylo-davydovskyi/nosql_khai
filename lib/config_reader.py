import os
from configparser import ConfigParser

project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

config_file_path = os.path.join(project_root, 'config.ini')

config = ConfigParser()
config.read(config_file_path)

def get_postgres_config():
    host = config.get('postgresql', 'host')
    db = config.get('postgresql', 'database')
    user = config.get('postgresql', 'user')
    password = config.get('postgresql', 'password')
    return host, db, user, password

def get_mongo_config():
    host = config.get('mongodb', 'host')
    port = config.getint('mongodb', 'port')
    db = config.get('mongodb', 'database')
    return host, port, db