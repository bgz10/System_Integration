const request = require('request');
const to_phone = '52801249';
const message = 'This is a test message';
const from_phone = '52801249'
const api_key = '';


request('https://fatsms.com/apis/api-send-sms?to-phone=' + to_phone + '&message=' + message + '&from-phone=' + from_phone + '&api-key=' + api_key, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var apiResponse = JSON.parse(body);
        console.log(apiResponse.title); // Print the google web page.
     }
});
