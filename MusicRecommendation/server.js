//Express based application

var express = require('express');

var app = express();

var controllers = require('./controllers/');

controllers.set(app);

app.get('/', function(request, response) {
	response.type('text/plain');
	response.send('Hello Hello ivan');
});

app.listen(8000);
	
console.log("Check 8000");
