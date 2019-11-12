import requests
import json
import time
import sqlite3
import jwt

print("Welcome to this marvelous multiple system program.")

while True:
    choice = input("Would you like to signup (1) or login (2)? To exit type 'exit'! ")
    if choice == "1":
        em = input("Your email: ")
        nm = input("Your name: ")
        pd = input("Your password: ")
        cp = input("Please confirm your password: ")
        while pd != cp:
            print("The two passwords do not match. Try again!")
            pd = input("Your password: ")
            cp = input("Please confirm your password: ")

        try:
            data = {
            'email': em,
            'name': nm,
            'password': pd
            }

            key_pem = ''
            with open('privkey.pem', 'rb') as f:
                key_pem = f.read()
 
            encoded = jwt.encode(data, key_pem, algorithm='RS256').decode('utf-8')
            url = "http://localhost/signup"

            response = requests.post(url, json={'token': encoded})
            if response.status_code == 500:
                print("Something was wrong. Please try again...")
                continue
            print("Congratulations! You are now registered. Please login!")
            choice = "2"
        except Exception as e:
            print("The request has failed.", e)
    if choice == "2":
        while True:
            print("Welcome. If you want to login press 1. If you want to exit to the main screen press 2")
            cho = input("Your choice: ")
            if cho == "1":
                email = input("Email: ")
                password = input("Password: ")
                url = "http://localhost/login"
                try:
                    data = {
                        'email': email,
                        'password': password
                    }

                    key_pem = ''
                    with open('privkey.pem', 'rb') as f:
                        key_pem = f.read()
 
                    encoded = jwt.encode(data, key_pem, algorithm='RS256').decode('utf-8')

                    response = requests.post(url, json={'token': encoded})

                    if response.status_code == 500:
                        print("An issue occured. Please check your credentials and try again")
                        continue
                    data = response.json()
                    token = data['key']
                    conn = sqlite3.connect('../keys.sqlite')
                    cursor = conn.cursor()
                    query = "SELECT * FROM public_keys WHERE service = 'main'"
                    cursor.execute(query)
                    public_key = cursor.fetchone()[1]
                    cursor.close()

                    decoded = jwt.decode(token, public_key, algorithms='RS256')
                    print(decoded)

                    while True:
                        print("Your token is safely stored. What would you like to do?")
                        print("1 - Logout")
                        print("2 - Bank -> Balance")
                        print("3 - Bank -> Deposit")
                        print("4 - Bank -> Withdraw")
                        print("5 - SKAT -> Overview")
                        print("6 - SKAT -> Pay debt")
                        print("7 - SKAT -> Withdraw tax money")
                        ch = input("Your choice: ")
                        if ch == "1":
                            print("We hope to see you some other time...")
                            break
                        elif ch == "2":
                            print("You choose to see your account balance...")
                            url = "http://localhost:8888/balance"
                            response = requests.post(url, json={'access_token': token})
                            if response.status_code == 500:
                                print("An error has occured...")
                                continue
                            js = response.json()
                            print('Status: ' + js['message'])
                            print('Balance: ' + str(js['balance']) + 'DKK')
                        elif ch == "3":
                            print("You choose to make a deposit...")
                            while True:
                                amount = input("Enter the amount and press enter: ")
                                try:
                                    if "." in amount :
                                        val = float(amount)
                                    else:
                                        val = int(amount)
                                        break
                                except ValueError:
                                    print("No.. the input string is not a number. It's a string")    

                            url = "http://localhost:8888/deposit"
                            response = requests.post(url, json={'access_token': token, 'amount': float(amount)})
                            if response.status_code == 500:
                                print("An error has occured...")
                                continue
                            js = response.json()
                            print('Status: ' + js['message'])
                            print('New Balance: ' + str(js['balance']) + 'DKK')
                        elif ch == "4":
                             print("You choose to make a withdraw...")
                             while True:
                                amount = input("Enter the amount and press enter: ")
                                try:
                                    if "." in amount :
                                        val = float(amount)
                                    else:
                                        val = int(amount)
                                        break
                                except ValueError:
                                    print("No.. the input string is not a number. It's a string")    

                             url = "http://localhost:8888/withdraw"
                             response = requests.post(url, json={'access_token': token, 'amount': float(amount)})
                             js = response.json()
                             if response.status_code == 500:
                                print("An error has occured...")
                                continue
                             elif response.status_code == 502:
                                print('Message: ' + js['message'])
                                print('Your balance: ' + str(js['balance']) + 'DKK')
                                print('Requested amount: ' + str(js['amount']) + 'DKK')
                                continue
                             else:
                                print('Status: ' + js['message'])
                                print('You have retrieved: ' + str(amount) +'DKK' + '\n' + 
                                'New Balance: ' + str(js['balance']) + 'DKK')
                        elif ch == "5":
                            print("You choose to see your SKAT overview...")
                            url = "http://localhost:8889/overview"
                            response = requests.post(url, json={'access_token': token})
                            if response.status_code == 500:
                                print("An error has occured...")
                                continue
                            js = response.json()
                            print('Status: ' + js['message'])
                            print('Debt: ' + str(js['debt']) + 'DKK')
                        elif ch == "6":
                            print("You choose to pay your SKAT debt...")
                            url = "http://localhost:8889/pay"
                            response = requests.post(url, json={'access_token': token})
                            if response.status_code == 500:
                                print("An error has occured...")
                                continue
                            elif response.status_code == 502:
                                js = response.json()
                                print('Message: ' + js['message'])
                                print('Requested amount: ' + str(js['debt']) + 'DKK')
                                continue
                            js = response.json()
                            print('Status: ' + js['message'])
                            print('Debt: ' + str(js['debt']) + 'DKK')
                        elif ch == "7":
                            continue
                        else:
                            print("You did not choose an option between 1 and 7... Try again.")
                            continue
                except Exception as e:
                    print("The request has failed.", e)
            elif cho == "2":
                print("You are now at the main screen...")
                break
            else:
                print("You did not choose 1 or 2... Try again.")
                continue
            
    elif choice == "exit":
        print("Have a good one. Your tokens will be deleted now...")
        break
    else:
        print("You didn't choose between 1 or 2...")