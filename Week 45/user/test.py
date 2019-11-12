import jwt
import sqlite3

data = {
    'this': 'that',
    'number': 1
}

conn = sqlite3.connect('../keys.sqlite')
cursor = conn.cursor()
query = "SELECT * FROM public_keys WHERE service = 'user'"
cursor.execute(query)
public_key = cursor.fetchone()[1]
cursor.close()
with open('privkey.pem', 'rb') as f:
    private_key = f.read()
    encoded = jwt.encode(data, public_key, algorithm='RS256').decode('utf-8')
    print(encoded)
    print(private_key)
    print(public_key)
    decoded = jwt.decode(encoded, private_key, algorithms='RS256')
    print(decoded)

