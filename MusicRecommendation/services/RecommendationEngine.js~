var q = require('q');

var UserService = require('../services/UserService');
var MusicService = require('../services/MusicService');

function Engine() {
/*
	var 
	return */
};


exports.MakeEngine = function(username) {

};

exports.Get2 = function(username) {
	var deferred = q.defer();
	
	q.all(
		[
			SongsWithTagsTheyveListenedTo(username),
			SongsTheirFolloweesListenTo(username)
		]
	).then(function success(songScoreSheets) {
		console.log(songScoreSheets);

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

		var recommendations = [];
		var n = highestScore;

		while (recommendations.length != 5 && n > 0) {
			
			var songs = finalScoreBuckets[n];
			console.log("songs: ", songs);
			if (songs.length > 0) {
				var recommendationsRemaining = 5 - recommendations.length;
				var r = songs.slice(0, recommendationsRemaining);
				recommendations = recommendations.concat(r);
			}
			n = n - 1;
		}
		deferred.resolve(recommendations);

		
	});

	return deferred.promise;
}

exports.Get = function(username) {
	var deferred = q.defer();

	//SongsWithTagsTheyveListenedTo(username)
	SongsTheirFolloweesListenTo(username)
		.then(function(musicmap) { 
		
			var recommendations = [];
			
			for (var key in musicmap) {
				recommendations.push(key);
			}
				
			deferred.resolve({ list : recommendations }); 
		});
		
	return deferred.promise;
}

function SongsTheirFolloweesListenTo(username) {

	var deferred = q.defer();
	
	GetUser(username)
		.then(GetUsersFollowees)
		.then(GetFolloweesMusic)
		.then(function(fm) { deferred.resolve(fm); });

	function GetUser(name) { 
		return UserService.Get(name);	
	}
		
	function GetUsersFollowees(user) {
		var followsNameList = user.follows;
		
		var userPromises = followsNameList.map(function(name) {
			return UserService.Get(name);
		});
		
		return q.all(userPromises);
	}
	
	function GetFolloweesMusic(users) {
		var deferred = q.defer();
		var songMap = {};
		
		var followeeLen = users.length;
	
		for (var i=0; i<followeeLen; i++) { 
			var user = users[i];
			
			var listens = user.listenedTo;		
			var listensLen = listens.length;
			
			for (var n=0; n<listensLen; n++) {

				var songMapping = songMap[listens[n]];
				if (songMapping != undefined) {
					songMapping++;
				} else {
					songMap[listens[n]] = 1;
				}
			}
		}

		deferred.resolve(songMap);
		
		return deferred.promise;
	}

	return deferred.promise;
};

function SongsWithTagsTheyveListenedTo(username) {
	var deferred = q.defer();
	var user = UserService.Get(username);
	
	user
		.then(getUsersListenedTo)
		.then(MusicService.GetBySongNames)
		.then(getTags)
		.then(MusicService.GetUniqueByTags)	
		.then(function success(songs) {
				var uniformSongMap = {};
			
				var songsLen = songs.length;
				for (var i=0; i<songsLen; i++) {
					if (uniformSongMap[songs[i].Song] == undefined) {
						uniformSongMap[songs[i].Song] = 1;
					} 
				}
				deferred.resolve(uniformSongMap);
			});

	function getUsersListenedTo(u) {
		var deferred = q.defer();
		deferred.resolve(u.listenedTo);
		return deferred.promise;
	};
	
	function getTags(songs) {
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
	
	return deferred.promise;
}






/*
	function getTagOccuranceMap(songs) {
		var deferred = q.defer();
		var tagOccuranceMap = {};
		
		var songsLen = songs.length;
		for (var i=0; i<songsLen; i++) {
			var tags = songs[i].Tags;
			
			var tagsLen = tags.length;
			for (var n=0; n<tagsLen; n++) {
				var tagMapping = tagOccuranceMap[tags[n]];
				
				if (tagMapping != undefined) {
					tagMapping++;
				} else {
					tagOccuranceMap[tags[n]] = 1;
				}
			}
		}
		deferred.resolve(tagOccuranceMap);	
		return deferred.promise;
	}
			
	return deferred.promise;
};
*/

