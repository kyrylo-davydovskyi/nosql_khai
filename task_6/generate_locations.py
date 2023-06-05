from tqdm import tqdm
from faker import Faker
from lib import config_reader
from lib.mongo_writer import MongoDBWriter

mongo_host, mongo_port, mongo_db = config_reader.get_mongo_config()

mongo_writer = MongoDBWriter(mongo_host, mongo_port, mongo_db, 'locations')

fake = Faker()

with tqdm(total=100000, ncols=80) as pbar:
    for _ in range(100000):
        longitude = float(fake.longitude())
        latitude = float(fake.latitude())
        location = {
            "address": fake.address(),
            "coordinates": [longitude, latitude]
        }
        mongo_writer.insert_one(location)
        pbar.update(1)

mongo_writer.close_connection()
print("Data insertion completed.")
