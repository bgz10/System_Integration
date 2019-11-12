import requests
import json
import jwt

headers = {'content-type' : 'application/json'}
data ={"email":"smlg@lrd.com"}

url = "https://w3certified.com/easyid/signup.php"

response = requests.post(url=url, params=data, headers=headers)
try:
    print(response.json())
except:
    print("The payload has been modified. Please try again with an authentic payload.")
