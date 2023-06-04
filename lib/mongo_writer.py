from pymongo import MongoClient

class MongoDBWriter:
    def __init__(self, host, port, database, collection):
        self.client = MongoClient(host, port)
        self.db = self.client[database]
        self.target_collection = self.db[collection]

    def insert_one(self, data):
        self.target_collection.insert_one(data)

    def insert_many(self, data):
        self.target_collection.insert_many(data)

    def close_connection(self):
        self.client.close()