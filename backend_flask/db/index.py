from pymongo import MongoClient

def dbConnect():
    # Connect to database
    client = MongoClient('mongodb://localhost:27017/')
    db = client['farm_sanctuaryDB']
    if db != '':
         print("* Database connected! **"+str(db))
    return db