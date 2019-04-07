'use strict';

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/timestamp/:date?', function (req, res) {
  let date = req.params.date;
  const unixTimestamp = parseInt(date * 1);
  
  // if the date is empty
  if(date === undefined) {
    // the service uses the current timestamp
    date = new Date();
  } 
  // if the date is not a unix timestamp
  else if (isNaN(unixTimestamp)) {
    date = new Date(date);
  } 
  // if the date is a unix timestamp
  else {
    date = new Date(unixTimestamp);
  }
    
  const response = date == "Invalid Date" ?
                   {"error": "Invalid Date"} :
                   {"unix": date.getTime(), "utc": date.toUTCString()};
  
  res.json(response);
});

const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});