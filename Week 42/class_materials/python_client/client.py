import requests

to_phone = input('Enter a valid phone number')
from_phone = ''
message = input('Enter your message')
api_key = "PY42mqiMXEYudLjv4RUcQFpR4UwYRW9FrTd5tex3T3PrR5zr4U"

PARAMS = {'to-phone': to_phone, 'message':  message, 'from-phone': from_phone, 'api-key': api_key}
URL = "https://fatsms.com/apis/api-send-sms"

r = requests.get(URL, PARAMS)

r.json()

# Broadcast a message to multiple numbers

phone_list = ['52801249', '52801249','52801249']
message_to_list = "Hello, I hope that you are fine."

for i in phone_list:
    response = requests.get(f'https://fatsms.com/apis/api-send-sms?to-phone={i}&message={message_to_list}&from-phone={from_phone}&api-key={api_key}')
    print(response.text)



