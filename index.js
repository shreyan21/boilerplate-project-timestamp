// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/')
app.get('/api/:date?',async(req,res)=>{
  const { date } = req.params;

  let parsedDate;

  // Handle empty date parameter, which should return the current date
  if (!date) {
    parsedDate = new Date();
  } else if (!isNaN(date)) {
    // Handle Unix timestamp
    parsedDate = new Date(parseInt(date));
  } else {
    // Handle ISO format or other date strings
    parsedDate = new Date(date);
  }

  // Check if the date is valid
  if (isNaN(parsedDate.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // Respond with both unix and utc formats
  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString()
  });

  // Return the formatted date
})
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
