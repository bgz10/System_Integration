import requests
import json
import jwt

response = requests.get('http://localhost:80')
try:
    x = jwt.decode(response.text,'some-secret', verify=True)
    # x = jwt.decode(response.text + "something",'some-secret', verify=True)
    print('Welcome', x['first_name'])
except:
    print("The payload has been modified. Please try again with an authentic payload.")
