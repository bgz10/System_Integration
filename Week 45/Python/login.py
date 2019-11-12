import requests
import json

headers = {'content-type' : 'application/x-www-form-urlencoded'}
data ={'email':'a@a.com', 'password': '1'}

url = "https://w3certified.com/easyid/login.php"
headers = {'content-type': 'application/x-www-form-urlencoded'}

response = requests.post(url=url, data=data, headers=headers)
try:
    print(response.text)
except Exception as e:
    print("The request has failed.", e)