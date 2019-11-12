import requests
import json

headers = {'content-type' : 'application/x-www-form-urlencoded'}
data ={'email':'sm@lrd.com'}

url = "https://w3certified.com/easyid/signup.php"
headers = {'content-type': 'application/x-www-form-urlencoded'}

response = requests.post(url=url, data=data)
try:
    print(response.json())
except Exception as e:
    print("The request has failed.", e)
