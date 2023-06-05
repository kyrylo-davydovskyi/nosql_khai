from pymongo import MongoClient


class MongoService:
    def __init__(self, host, port):
        self.client = MongoClient(host, port)
        self.current_database = None
        self.current_collection = None

    def get_database_names(self):
        return self.client.list_database_names()

    def set_database(self, database):
        self.current_database = database

    def get_collection_names(self):
        if self.current_database is None:
            raise ValueError("Database must be set before retrieving collection names.")

        db = self.client[self.current_database]
        return db.list_collection_names()

    def set_collection(self, collection):
        self.current_collection = collection

    def get_collection_fields(self):
        if self.current_database is None or self.current_collection is None:
            raise ValueError("Database and collection must be set before retrieving fields.")

        db = self.client[self.current_database]
        collection = db[self.current_collection]
        fields = collection.find_one()
        return {key: type(value).__name__ for key, value in fields.items()}
    
    def read_documents(self, filter=None):
        if self.current_database is None or self.current_collection is None:
            raise ValueError("Database and collection must be set before reading documents.")

        db = self.client[self.current_database]
        collection = db[self.current_collection]

        if filter is None:
            return list(collection.find())
        else:
            return list(collection.find(filter))

    def write_documents(self, data):
        if self.current_database is None or self.current_collection is None:
            raise ValueError("Database and collection must be set before writing documents.")

        db = self.client[self.current_database]
        collection = db[self.current_collection]

        if isinstance(data, list):
            collection.insert_many(data)
        else:
            collection.insert_one(data)

    def delete_documents(self, filter):
        if self.current_database is None or self.current_collection is None:
            raise ValueError("Database and collection must be set before deleting documents.")

        db = self.client[self.current_database]
        collection = db[self.current_collection]
        collection.delete_many(filter)


    def delete_document(self, filter):
        if self.current_database is None or self.current_collection is None:
            raise ValueError("Database and collection must be set before deleting documents.")

        db = self.client[self.current_database]
        collection = db[self.current_collection]
        collection.delete_one(filter)

    def modify_documents(self, filter, update):
        if self.current_database is None or self.current_collection is None:
            raise ValueError("Database and collection must be set before modifying documents.")

        db = self.client[self.current_database]
        collection = db[self.current_collection]
        collection.update_many(filter, update)
