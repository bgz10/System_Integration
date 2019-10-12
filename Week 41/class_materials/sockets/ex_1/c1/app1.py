from bottle import route, run
import requests
import json
# run pip3 install -g requests
# get the data from targeting a request
response = requests.get('http://localhost:2222/get-data/222')

# print the data
print(response.text)

# convert to json
jp = json.loads(response.text)
print(f"The name of the person is: {jp['name']}")

# second exercise

response2 = requests.get('http://localhost:2222/next-case')

j = json.loads(response2.text)

if j['status'] == 0:
    print("No case to display")
else:
    print(j)