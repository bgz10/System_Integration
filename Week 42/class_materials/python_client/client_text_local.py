import urllib.request
import urllib.parse
  
def sendSMS(apikey, numbers, sender, message):
    params = {'apikey': apikey, 'numbers': numbers, 'message' : message, 'sender': sender}
    f = urllib.request.urlopen('https://api.textlocal.in/send/?'
        + urllib.parse.urlencode(params))
    return (f.read(), f.code)
  
resp, code = sendSMS('0bdwh0MN4aA-Ldjg6HofeVusDtxhOgRmqz6rLK2Rj2', '004552801249',
    'Jims Autos', 'Test with an ampersand (&) and a £5 note')
print (resp)