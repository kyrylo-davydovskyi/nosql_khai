from lib.mongo_helper import MongoService
from lib.config_reader import get_mongo_config
from lib.value_converter import convert_value


host, port, db = get_mongo_config()
service = MongoService(host, port)

def print_menu():
    print("\n--- MENU ---")
    print("Current database:", service.current_database)
    print("Current collection:", service.current_collection)
    print("1. Change DB or Collection")
    print("2. View operations")
    print("3. Add operations")
    print("4. Edit operations")
    print("5. Delete operations")
    print("0. Exit")


def set_db_and_collection():
    databases = service.get_database_names()
    print("Databases:", databases)

    selected_db = input("Enter the name of the database: ")
    service.set_database(selected_db)

    collections = service.get_collection_names()
    print("Collections:", collections)

    selected_collection = input("Enter the name of the collection: ")
    service.set_collection(selected_collection)


def print_documents_from_db():
    print_choice = input("Do you want to print all documents? (y/n): ")
    filter_query = {}
    if print_choice.lower() == "n":
        filter_query = eval(input("Enter filter (in JSON format): "))
    documents = service.read_documents(filter_query)
    for document in documents:
        print(document) 


def read_document_from_console():
    document = {}
    print("Enter document details:")

    for key, type in service.get_collection_fields().items():
        if key == "_id":
            continue
        value = input(key + ": ")
        converted_value = convert_value(value, type)
        document[key] = converted_value
    return document


def add_document():
    num_documents = int(input("Enter the number of documents to add: "))
    if num_documents == 1:
        document = read_document_from_console()
        service.write_documents(document)
        print("Document added successfully.")
    else:
        documents = []
        for _ in range(num_documents):
            documents.append(read_document_from_console())
        service.write_documents(documents)
        print("Documents added successfully.")


def edit_document():
    filter_query = eval(input("Enter the filter for the document(s) to edit (in JSON format): "))
    documents = service.read_documents(filter_query)

    if len(documents) == 0:
        print("No documents found matching the filter.")
        return
    

    print(f'Found {len(documents)}. ALL WILL BE UPDATE. Matching documents :')
    for document in documents:
        print(document)

    # Prompt for the fields to update
    update_fields = {}
    for key, type in service.get_collection_fields().items():
        if key == "_id":
            continue
        update_choice = input(f"Update {key}? (Y/N): ")
        if update_choice.lower() == "y":
            value = input(f"Enter new value for {key}: ")
            converted_value = convert_value(value, type)
            update_fields[key] = converted_value

    if not update_fields:
        print("No fields selected for update.")
        return

    # Update the matching documents
    service.modify_documents(filter_query, {"$set": update_fields})
    print("Documents updated successfully.")


def delete_document():
    filter_query = eval(input("Enter the filter for the document(s) to edit (in JSON format): "))
    documents = service.read_documents(filter_query)

    if len(documents) == 0:
        print("No documents found matching the filter.")
        return
    

    print(f'Found {len(documents)}.')
    for document in documents:
        print(document)

    delete_choice = int(input("Delete all matching documents? 1. All 2. One 3. None:"))
    if delete_choice == 1:
        service.delete_documents(filter_query)
        print("Documents deleted successfully.")
    elif delete_choice == 2:
        service.delete_document(filter_query)
        print("Document deleted successfully.")
    else:
        print("No documents deleted.")
        
    

def main():
    set_db_and_collection()

    # Main loop
    while True:
        print_menu()
        choice = input("Enter your choice: ")

        if choice == "1":
            set_db_and_collection()
        elif choice == "2":
            print_documents_from_db()
        elif choice == "3":
            add_document()
        elif choice == "4":
            edit_document()
        elif choice == "5":
            delete_document()
        elif choice == "0":
            break
        else:
            print("Invalid choice. Please try again.")

    # Close the MongoDB connection
    service.client.close()


if __name__ == "__main__":
    main()
