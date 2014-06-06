//Make recommendations based on:
//What music they have listened to before
//People who the user follow in the first degree
//Possibly nth degree
//Maximize for discovery of new songs
var q = require('q');

var FollowService = require('../services/FollowService');
var ListenService = require('../services/ListenService');
var MusicService = require('../services/MusicService');

//If I want to do soemthing allong the lines of what I had originally described, a lot of caching would probably be the more powerful tool.
//Probably a middle layer that controls caching for this data, so data access does not have to keep being made ie. controls to handle how often we recharge cache

//maybeo n construction of recommendationengine, make a cache based on the user

//Get all songs that their followees listen to scored
exports.SongsTheirFolloweesListenTo = function(user) {
	
	var defer = q.defer();
	
	FollowService.GetFollowees(user)
		.then(
			function success(followees) {
			
				var followeesMusicPromises = followees.map(function(f) {
					return ListenService.GetByUser(f.to);
				});
			
				return q.all(followeesMusicPromises);	
			}			
		)
		.then(
			function success(followeesMusic) {
				var MusicOccurances = {};
			
				var followeesMusicCount = followeesMusic.length;
				
				for (var x=0;x<followeesMusicCount;x++) {
					
					var musicListenedTo = followeesMusic[x].valueOf();
					
					for (var y=0; y<musicListenedTo.length; y++) {
						var occurance = MusicOccurances[musicListenedTo[y]];
						if (occurance == undefined) {
							occurance = 0;
						} else {
							occurance++;
						} 
					}
				}
				defer.resolve(MusicOccurances);
			}
		)
		
	return defer.promise;
}




exports.Recommendations = function(user) {
	var deferred = q.defer();
	
	var songsTheyveListenedTo = null;
	
	FollowService.GetFollowees(user).then(
		
	);
	
	return deferred.promise;
}

exports.MakeRecommendationEngine = function() {
	return new RecommendationEngine();
};

function RecommendationEngine() {
	
	this.Make = function(user) {

	};
}

//What songs They've listened to? -> Songs have tags -> Songs that have the same tags

//Who they are following -> Songs their followees are listening too -> songs && (Songs with same tags that they are listening to)

