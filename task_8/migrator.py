from lib import config_reader
from lib.mongo_writer import MongoDBWriter
from lib.postgres_reader import PostgreSQLReader


def main():
    pg_host, pg_db, pg_user, pg_password = config_reader.get_postgres_config()
    mongo_host, mongo_port, mongo_db = config_reader.get_mongo_config()

    # Initialize PostgreSQL reader and MongoDB writer
    pg_reader = PostgreSQLReader(pg_host, pg_db, pg_user, pg_password)
    mongo_writer = MongoDBWriter(mongo_host, mongo_port, mongo_db, collection="users")

    users_data = pg_reader.execute_query('SELECT id, name, email FROM users')
    wallets_data = pg_reader.execute_query('SELECT userid, id, balance FROM wallets')

    users_map = {}
    for user_row in users_data:
        user_id, user_name, user_email = user_row
        users_map[user_id] = {
            'id': user_id,
            'name': user_name,
            'email': user_email,
            'wallets': []
        }

    for wallet_row in wallets_data:
        user_id, wallet_id, wallet_balance = wallet_row
        if user_id in users_map:
            users_map[user_id]['wallets'].append({
                'id': wallet_id,
                'balance': float(wallet_balance)
            })

    users_list = list(users_map.values())
    mongo_writer.insert_many(users_list)

    # Close connections
    pg_reader.close_connection()
    mongo_writer.close_connection()

if __name__ == '__main__':
    main()
