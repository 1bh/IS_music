//Express based application

var express = require('express');
var bodyparser = require('body-parser');
var app = express();

app.use(bodyparser());

app.use(function(request, response, next) {
	console.log("Request made: (Testing this middleware stuff :]");
	next();
});

var controllers = require('./controllers/');

controllers.set(app);

app.get('/', function(request, response) {
	response.type('text/html');
	response.send('<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>');
});

app.listen(8000);
	
console.log("Check 8000");
