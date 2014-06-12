var assert = require("assert");
var http = require('http');
var request = require('supertest');
var q = require('q');
var fs = require('fs');


//File paths
var STATICJSONDIR = '../initialgist/gist5042053a95b8bc5e0cb9-2780cd52ab0a6b5122c6350a92254729011b20ce';
var LISTENJSON = '/listen.json';
var FOLLOWJSON = '/follows.json';

describe('TestScript', function() {
	it("should see all responses succeed", function(done) {

		var postToFollowAPI =
			readJSONFile( STATICJSONDIR + FOLLOWJSON )
				.then( formatFollowJSONForAPI )
				.then( function (data) {
					var postPromises = data.map(function(d) { 
						doPost('follow', d);
					});
					return q.all(postPromises);
				});
				
		var postToListenAPI = 
			readJSONFile( STATICJSONDIR + LISTENJSON )
				.then( formatListenJSONForAPI )
				.then( function (data) {
					var postPromises = data.map(function(d) { 
						doPost('listen', d);
					});
					return q.all(postPromises);
				});
				
		q.all([postToFollowAPI, postToListenAPI])
			.then(function(success) {
			
				request('http://127.0.0.1:9001')
					.get('/' + 'recommendations' + '?user=a')
					.end(function(err, res) {
						console.log("For user a, we recommend: ", res.body);
						done();
					});	
			});
		
	});
});


function readJSONFile(path) {
	var deferred = q.defer();
	
	fs.readFile(path, 'utf8', function(e, d) {
		data = JSON.parse(d);
		deferred.resolve(data);
	});
	
	return deferred.promise;
}

//Groom the json data for consumption in the API's
function formatFollowJSONForAPI(object) {
	var deferred = q.defer();
	
	var followList = object.operations.map(function(op) {
		return { from : op[0], to : op[1] };
	});
	
	deferred.resolve(followList);
	
	return deferred.promise;
}

function formatListenJSONForAPI(object) {
	var deferred = q.defer();
	
	var listenList = [];
	
	var userListens = object.userIds;
	
	for (var key in userListens) {
		for (var l in userListens[key]) {
			listenList.push({ user : key , music : userListens[key][l]});
		}
	}
	
	deferred.resolve(listenList);
	
	return deferred.promise;
}

function doPost(resourceName, model) {
	var deferred = q.defer();
			
	request('http://127.0.0.1:9001')
		.post('/' + resourceName)
		.send(model)
		.end(function(err, res) {
		deferred.resolve();
	});

	return deferred.promise;
}

