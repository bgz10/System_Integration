const express = require('express')
const app = express()

// ##################################################
app.get( '/' , (req, res)=>{
  res.send('A')
})

// ##################################################
app.get( '/getWeather', (req, res)=>{
  let randomNumber = Math.random() * 1000
  res.send( randomNumber.toString() ) // 200
})

// ##################################################
app.get( '/getWeather/:cityName', (req, res) => {
  let cityName = req.params.cityName
  res.status(200).send('Nice Weather in ' + cityName)
})

// ##################################################
app.get( '/resizeImge' , (req, res) => {
  // Resize the image that was passed in the request
})

// ##################################################
app.get( '/test', (req, res) => {
  // Pretend this data came from another API
  // Version 1 in version 2 they change name to firstName
  let user = {
      "id":1, "name":"A", "lastName":"B",
      "location":{
        "streetName":"Street 1",
        "city":"Copenhagen",
        "phones":[
          {"phoneNumber":"1", "type":"mobile"},
          {"phoneNumber":"2", "type":"land-line"}
        ]
      }
    }

  user.address.phones.push({"phoneNumber":"3", "type":"secret"}) 
  // user.address.weather = "12"
  res.send( user.address.phones )
})



// ##################################################
// sendSms?toPhone=11111&message=Hi there
app.get( '/sendSms' , (req, res)=>{
  let toPhone = req.query.toPhone
  let message = req.query.message
  console.log(toPhone)
  console.log(message)
  res.send( toPhone + ' ' + message )
})




app.listen( 8080, (err) => {
  if(err){  console.log('Cannot listen'); return }
  console.log('Server listening ...')
})


