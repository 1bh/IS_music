var fs = require('fs');
var q = require('q');

var MusicService = require('../services/MusicService');

exports.importJSONMapFile = function(FILEPATH) {
	var defer = q.defer();
	
	fs.readFile(FILEPATH, 'utf8', function (err, data) {
	  if (err) {
	  	defer.reject();
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
		 	function success() { defer.resolve();},
		 	function failure() { defer.reject(); }
		 );
	  }
	});
	return defer.promise;
};
