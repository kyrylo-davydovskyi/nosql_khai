import psycopg2

class PostgreSQLWriter:
    def __init__(self, host, database, user, password):
        self.conn = psycopg2.connect(host=host, database=database, user=user, password=password)
        self.cursor = self.conn.cursor()

    def execute(self, query, params=None):
        self.cursor.execute(query, params)

    def execute_many(self, query, data):
        self.cursor.executemany(query, data)

    def commit(self):
        self.conn.commit()

    def close_connection(self):
        self.cursor.close()
        self.conn.close()
