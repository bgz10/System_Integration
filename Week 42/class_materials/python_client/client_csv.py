import csv
import requests

URL = "https://fatsms.com/apis/api-send-sms"


with open('data.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    for row in csv_reader:

        if line_count != 0:
            msg1 = row[0]
            msg2 = row[1]
            receiver = msg1
            sender = "71681006"
            sms = msg2
            api_key = "PY42mqiMXEYudLjv4RUcQFpR4UwYRW9FrTd5tex3T3PrR5zr4U"

            PARAMS = {'to-phone': receiver, 'message': sms, 'from-phone': sender, 'api-key': api_key}

            r = requests.get(URL, PARAMS)

            r.json()


        line_count += 1
        #else:
          #  print(f'\t{row[0]} works in the {row[0]} department, and was born in {row[1]}.')
    print(f'Processed {line_count} lines.')