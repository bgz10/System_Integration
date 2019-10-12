# Pickle is serialize
# Pickling... is serializing
# Unpickling is deserializing
import pickle

person = {'name': 'Bogdan'}
person['lastname'] = 'Muntean'

# adding a key value pair
person['year'] = 2019
print(person)

# deleting a key value pair
del person['year']
print(person)

print(f'The persons name is {person["name"]}')

# adding phone numbers
person['phones'] = ['12312', '2112123', '11244231']

# removing the last entry
person['phones'].pop()
print(person)

# removing a specific entry
person['phones'].pop(1)
print(person)

# itterating over the phone numbers of a person
for phone in person['phones']:
    print(f'phone: {phone}')

company = {"phones":[
  {"phone":"1", "public":0},
  {"phone":"2", "public":1},
  {"phone":"3", "public":0},
]}

# Formating the print in accordance to the number being public or not (1 or 0)
for ph in company['phones']:
    print(f'Phone {ph["phone"]} is {"private" if ph["public"] == 0 else "public"}')
    # same result, different formatting
    print(f"Phone {ph['phone']} is %s" %("private" if ph['public'] == 0 else "public") )

# reading from a file
# with open('data', 'rb') as f:
#     print(f.read())

# Write on a file
# with open('data', 'w') as f:
#     f.write('This is what I write')

# pickling a person - serializing
with open('data', 'wb') as f:
    pickle.dump(person, f)

# unpickling a person - deserializing
with open('data', 'rb') as f:
    p = pickle.load(f)
    print(p)