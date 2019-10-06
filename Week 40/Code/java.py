import sqlite3

print("THIS IS JAVA")

db = sqlite3.connect("data.db")
while 1:
    cpr = input("CPR:")
    name = "aasda"
    note = input('What is the issue: ') + '\n'
    stmt = db.cursor()
    stmt.execute('INSERT INTO users VALUES(?,?,?,?)', (cpr, name, note, 0))
    db.commit()    
