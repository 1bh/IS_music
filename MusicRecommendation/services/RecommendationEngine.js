var q = require('q');

var UserService = require('../services/UserService');
var MusicService = require('../services/MusicService');

/*
A songScoreSheet is an object that has songs as keys, and a score (int) as a value
The idea is to be able to create functions that return these song score sheets, and
process these score sheets at a higher level
*/
exports.GetEngine = function(username) {
	return new Engine(username);
};

//Engine which should eventually be a bit configurable
//IE. Choose which recommendation axioms we would like to use, recommendation size, scoring options for those axioms
//The axioms like "SongsWithTagsTheyveListenedTo, may become more like configurable objects with a run method
function Engine(forUsername) {

	var User = UserService.Get(forUsername);

	var recommendationLimit = 5;


	//Gets songScoreSheets for each method run, and then aggregate them into a score board, and recommend based on that
	this.getRecommendation = function() {
	
		return User
			.then(
				function(user) {
					return q.all([SongsWithTagsTheyveListenedTo(user), SongsTheirFolloweesListenTo(user)])
							.then( MakeScoreBoard )
							.then( MakeRecommendations );		
				
				});	
	};
	
	function MakeRecommendations(scoreBoard) {

		var deferred = q.defer();

		var recommendations = [];
		
		var highestScore = 0;
		for (var key in scoreBoard) {
			if (key > highestScore) {
				highestScore = key;
			}
		}

		while (recommendations.length != recommendationLimit && highestScore > 0) {

			var songs = scoreBoard[highestScore];

			if (songs.length > 0) {
				var recommendationsRemaining = recommendationLimit - recommendations.length;
				var r = songs.slice(0, recommendationsRemaining);
				
				recommendations = recommendations.concat(r);
			}
			highestScore = highestScore - 1;
		}

		if (recommendations.length  < 5) {
			//Recommendation requires bonus round
			//No time but I might have done something like, look at tags of what recommendations were made,
			//Or have some sort of tool to see what other music was recommended to users if m2 was part
			//of their recommendations, so I will handle worst case only where nothing can be related to user
			MusicService.Read().then(function(music) {
				return music
					.filter(function(m) { return recommendations.indexOf(m) == -1; })
					.map(function(s) { return s.Song; });
			}).then(function(filteredMusic) {
				var r = filteredMusic.slice(0, recommendationLimit - recommendations.length);
				recommendations = recommendations.concat(r);
				deferred.resolve(recommendations);
			})
		} else {
			deferred.resolve(recommendations);
		}
		return deferred.promise;
	}
}

//Returns a map where scores point to lists of music that scored that score
function MakeScoreBoard(songScoreSheets) {
	var deferred = q.defer();

	//Add up scores from all score sheets
	var masterScoreSheet = {};
	
	var sheetsLength = songScoreSheets.length;
	
	for (var i=0; i<sheetsLength; i++) {
	
		var scoreSheet = songScoreSheets[i];

		for (var key in scoreSheet) {

			if (masterScoreSheet[key] == undefined) {
				masterScoreSheet[key] = scoreSheet[key];
			} else {
				masterScoreSheet[key] = masterScoreSheet[key] + scoreSheet[key];
			}
		}
	}

	//Arrange the scores as buckets, and have them pointing to lists of the music that have those scores
	var finalScoreBuckets = {};
	var highestScore = 0;
	
	for (var key in masterScoreSheet) {
		var songScore = masterScoreSheet[key];
		if (songScore > highestScore) {
			highestScore = songScore;
		}
		if (finalScoreBuckets[songScore] == undefined) {
			finalScoreBuckets[songScore] = [key];
		} else {
			finalScoreBuckets[songScore].push(key);
		}
	}

	deferred.resolve(finalScoreBuckets);

	return deferred.promise;
}

//Return all songs that the users followees listen to
function SongsTheirFolloweesListenTo(user) {
	var ignoreList = user.listenedTo;
	var deferred = q.defer();
	
	GetUsersFollowees(user)
		.then(GetFolloweesMusic)
		.then(function(songs) { return songs.filter(function(s) { return ignoreList.indexOf(s) == -1 }); })
		.then(MakeScoreSheet)
		.then(function(scoreSheet) { deferred.resolve(scoreSheet); });
	
	
	function GetUsersFollowees(user) {
		var followsNameList = user.follows;
		
		var userPromises = followsNameList.map(function(name) {
			return UserService.Get(name);
		});
		
		return q.all(userPromises);
	}
	
	function GetFolloweesMusic(users) {
		var deferred = q.defer();
		
		var songs = [];
		
		var followeeLen = users.length;
		
		for (var i=0; i<followeeLen; i++) { 
			var user = users[i];
			
			var listens = user.listenedTo;
			var listensLen = listens.length;
			
			for (var n=0; n<listensLen; n++) {
				songs.push(listens[n]);
			}
		}

		deferred.resolve(songs);
		
		return deferred.promise;
	}
	
	function MakeScoreSheet(songs) {
		var songMap = {};
		
		var songsLen = songs.length;
		
		for (var n=0; n<songsLen; n++) {

			var songMapping = songMap[songs[n]];
			if (songMapping != undefined) {
				songMapping++;
			} else {
				songMap[songs[n]] = 1;
			}
		}

		deferred.resolve(songMap);
		
		return deferred.promise;
	}

	return deferred.promise;
};

//Return all songs that have the same tags as music theyve already listened to
//Would be nice to provide weighing schemas for this method, as described earlier 
//With configurable rules. ie. if song matches more than one tag, score it higher
function SongsWithTagsTheyveListenedTo(user) {
	var ignoreList = user.listenedTo;
	var deferred = q.defer();
	
	GetUsersListenedTo(user)
		.then(MusicService.GetBySongNames)
		.then(GetTags)
		.then(MusicService.GetUniqueByTags)	
		.then(function(Music) { return Music.map(function(m) { return m.Song; }) })
		.then(function(songs) { return songs.filter(function(s) { return ignoreList.indexOf(s) == -1 }); })
		.then(MakeScoreSheet)
		.then(function(scoreSheet) { deferred.resolve(scoreSheet); });

	function GetUsersListenedTo(u) {
		var deferred = q.defer();
		deferred.resolve(u.listenedTo);
		return deferred.promise;
	};
	
	function GetTags(songs) {
		var deferred = q.defer();
		var songTags = [];
		
		var songsLen = songs.length;
		for (var i=0; i<songsLen; i++) {
			var tags = songs[i].Tags;
			
			var tagsLen = tags.length;
			for (var n=0; n<tagsLen; n++) {
				if (songTags.indexOf(tags[n]) == -1) {
					songTags.push(tags[n]);
				}
			}
		}
		deferred.resolve(songTags);	
		return deferred.promise;
	}
	
	function MakeScoreSheet(songs) {
		var songMap = {};
		
		var songsLen = songs.length;
		
		for (var n=0; n<songsLen; n++) {

			var songMapping = songMap[songs[n]];
			if (songMapping != undefined) {
				songMapping++;
			} else {
				songMap[songs[n]] = 1;
			}
		}

		deferred.resolve(songMap);
		
		return deferred.promise;
		}
	
	return deferred.promise;
}


