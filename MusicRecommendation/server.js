
var express = require('express');
var bodyparser = require('body-parser');
var q = require('q');
var MusicImportService = require('./services/MusicImportService');


//Initial Music data loading

var MUSICPATH = '../initialgist/gist5042053a95b8bc5e0cb9-2780cd52ab0a6b5122c6350a92254729011b20ce/music.json';

MusicImportService.importJSONMapFile(MUSICPATH).then(
	function success() { console.log("Music Data import successful"); },
	function failure() { console.log("Music Data import failed"); }
);



//Express based HTTP server
//Main middleware pipeline

var app = express();

app.use(bodyparser());

app.use(function(request, response, next) {
/*
	console.log("Request made: (Testing this middleware stuff :]");
	console.log("Is there any nice model binding/ model" + 
		"checking libraries out there. maybe ones that use jsonschema or something");
*/
	next();
});

var controllers = require('./controllers/');

controllers.set(app, q);

app.get('/', function(request, response) {
	response.type('text/html');
	response.send('<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>');
});

app.listen(9001);
	
console.log("THE SERVER IS OVER 9000");
