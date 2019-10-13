const request = require('request');
request('http://localhost:3000/notes/5da2fedf17ab80cba93d43fa', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var apiResponse = JSON.parse(body);
        console.log(apiResponse.title); // Print the google web page.
     }
});

request.post('http://localhost:3000/notes', {
  json: {
    title: 'Buy the milk',
    content: 'This note says to buy milk'
  }
}, (error, res, body) => {
  if (error) {
    console.error(error)
    return
  }
  console.log(`statusCode: ${res.statusCode}`)
  console.log(body)
})