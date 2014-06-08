//Make recommendations based on:
//What music they have listened to before
//People who the user follow in the first degree
//Possibly nth degree
//Maximize for discovery of new songs
var q = require('q');

var UserFactory = require('../services/UserFactory');

var MusicService = require('../services/MusicService');

//If I want to do soemthing allong the lines of what I had originally described, a lot of caching would probably be the more powerful tool.
//Probably a middle layer that controls caching for this data, so data access does not have to keep being made ie. controls to handle how often we recharge cache

//work with song maps Every promise of song lists should return a scored map of occurance

//maybeo n construction of recommendationengine, make a cache based on the user
// just so we can pipe it in a chain. im on the fence about using success handlers this way, I normally liek to only return promises inside "then", but i am trying something new
exports.SongsTheirFolloweesListenTo = function(username) {
	var deferred = q.defer();
		
	var UserPromise = UserFactory.Make(username);	
		
	var getUserFolloweeList = function(username) {
		return UserPromise.then(
			function(user) {
				return user.follows; 				
			});
	};
	
	var getFolloweesUserObjects = function(usernameList) {
		var userPromises = usernameList.map(function(name) {
			return UserFactory.Make(name);
		});
		return q.all(userPromises).then(
			function(users) {
				return users;
			}
		);
	}
	
	var getUsersMusic = function(users) {
		var songMap = {};
		var followeeLen = users.length;
		
		for (var i=0; i<followeeLen; i++) { 
			var user = users[i];
			var listens = user.listenedTo;
			
			var listensLen = listens.length;
			for (var n=0; n<listensLen; n++) {
				var songMapping = songMap[listens[n]];
				if (songMapping == undefined) {
					songMapping = 0;
				}
				songMapping++;
			}
		}
		deferred.resolve(songMap);
	}
	
	getUserFolloweeList
		.then(getFolloweesUserObjects)
			.then(getUsersMusic);
	
	return deferred.promise;
};

exports.SongsWithTagsTheyveListenedTo = function(user) {
	var deferred = q.defer();
	
	var UserPromise = UserFactory.Make(username);

	var usersSongsListenedTo = UserPromise.then(
		function(user) {
			return user.listenedTo;
		});
		
	var getTagOccuranceMap = function(songnames) {
		return MusicService.GetBySongNames(songnames).then(
			function(songs) {
				var tagOccuranceMap = {};
				
				var songslen = songs.length;
				
				for (var i=0; i<songslen; i++) {
					var songtags = songs[i].Tags;
					
					var tagsLen = songtags.length;
					
					for(var n=0; n<tagsLen; n++) {
						var songtag = songtags[n];
						var songTagMapping = tagOccuranceMap[songtag];
						if (songTagMapping == undefined) {
							songTagMapping = 0;
						} 
						songTagMapping++;
					}
				}
				
				return tagOccuranceMap;
			});
	};
	
	var getSongMapBasedOnTags = function(tagOccurnaceMap) {
		var songMap = {};
		
	}
};


exports.SongsSimilarilyTagged = function(user) {
	
	ListenService.Get(user)
		.then(
			function success(listens) {
				
			}
		)
}


exports.MakeRecommendationEngine = function() {
	return new RecommendationEngine();
};

function Rule() {
	this.Name = null;
	this.Description = null;
	this.Execute = function() {
	};
}

function RecommendationEngine() {
	
	this.Make = function(user, rules) {
		q.all(
			rules.map(function(r) {
				return r.Execute();
			})
		).then(
			function success(d) {
				//Do scoring here
			}
		)
	};
}

//What songs They've listened to? -> Songs have tags -> Songs that have the same tags

//Who they are following -> Songs their followees are listening too -> songs && (Songs with same tags that they are listening to)

