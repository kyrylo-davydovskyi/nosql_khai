import random
import string
from tqdm import tqdm
from datetime import datetime
from faker import Faker
from lib import config_reader
from lib.mongo_writer import MongoDBWriter

mongo_host, mongo_port, mongo_db = config_reader.get_mongo_config()

mongo_writer = MongoDBWriter(mongo_host, mongo_port, mongo_db, 'users')

fake = Faker()

def get_random_string(length):
    letters = string.ascii_letters
    return ''.join(random.choice(letters) for _ in range(length))

with tqdm(total=100000, ncols=80) as pbar:
    for _ in range(100000):
        name = fake.name()
        email = fake.email()
        password = get_random_string(8)
        date_of_birth = datetime.combine(fake.date_of_birth(minimum_age=18, maximum_age=90), datetime.min.time())
        address = fake.address().replace("\n", ", ")
        phone = fake.phone_number()
        is_active = random.choice([True, False])

        record = {
            "name": name,
            "email": email,
            "password": password,
            "dateOfBirth": date_of_birth,
            "address": address,
            "phone": phone,
            "isActive": is_active
        }
        mongo_writer.insert_one(record)
        pbar.update(1)

mongo_writer.close_connection()
print('Done')