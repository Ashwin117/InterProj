'use strict';

let express = require('express');
let bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.json());

let PORT = 8000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
	console.log('Fetching data...');
	res.send(getDate());
});

console.log('Listening at port:' + PORT);
app.listen(PORT);


const getDate = () => {
	return {
		"events": [
		  {
		    "occasion": "Birthday party",
		    "invited_count": 120,
		    "year": 2016,
		    "month": 2,
		    "day": 14
		  },
		  {
		    "occasion": "Technical discussion",
		    "invited_count": 23,
		    "year": 2016,
		    "month": 11,
		    "day": 24
		  },
		  {
		    "occasion": "Press release",
		    "invited_count": 64,
		    "year": 2015,
		    "month": 12,
		    "day": 17,
		    "cancelled": true
		  },
		  {
		    "occasion": "New year party",
		    "invited_count": 55,
		    "year": 2016,
		    "month": 1,
		    "day": 1
		  }
		]
	}
}
