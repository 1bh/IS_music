//General Dependencies
var fs = require('fs');
var q = require('q');


//Initial Music data loading
var MUSICPATH = '../initialgist/gist5042053a95b8bc5e0cb9-2780cd52ab0a6b5122c6350a92254729011b20ce/music.json';
var MusicService = require('./services/MusicService');

console.log("Loading data into the server");

fs.readFile(MUSICPATH, 'utf8', function (err, data) {
  if (err) {
  	console.log("Music data import failed");
  } else {
  	var music = JSON.parse(data);
 	
 	var importpromises = [];
 	
 	for (var m in music) {
 		importpromises.push(
 			MusicService.Add({
 				Song: m,
 				Tags: music[m]
 			})
 		);
 	}

 	q.all(importpromises).then(
	 	function success() {
	 		console.log("Music data import complete");
	  	});
  }
});




//Express based HTTP server
var express = require('express');
var bodyparser = require('body-parser');

var app = express();

app.use(bodyparser());

app.use(function(request, response, next) {
	console.log("Request made: (Testing this middleware stuff :]");
	next();
});

var controllers = require('./controllers/');
controllers.set(app, q);

app.get('/', function(request, response) {
	response.type('text/html');
	response.send('<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>');
});

app.listen(8000);
	
console.log("Check 8000");
