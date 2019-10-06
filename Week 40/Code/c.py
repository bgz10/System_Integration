import time
import sqlite3

db = sqlite3.connect('data.db')

print("THIS IS C#")
while 1:
    choice = input("Get next issue? (y/n)")
    if choice == 'y':
        stmt = db.cursor()
        row = stmt.execute("SELECT * FROM users WHERE status = 0 LIMIT 1").fetchone()
        if not row:
            print("there are no more rows")
            continue
        print(row)
        solved = input("Is the issue solved? [y/n]: ")
        if solved == "y":
            stmt.execute("UPDATE users SET status = 1 WHERE id = " + row[0])
            db.commit()
    time.sleep(2)