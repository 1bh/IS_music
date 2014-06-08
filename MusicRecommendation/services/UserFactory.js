//This is probably poorly named. This is supposed to be a class that is responsible for generating a USER 
//It will aggregate a bunch of the users information to make it easier to access.
//This object could also be probably timestamped and cached/stored to be used in subsequent recommendation requests
//Where staleness is tolerable
//RecommendableUser
var q = require('q');

var FollowService = require('../services/FollowService');
var ListenService = require('../services/ListenService');
var MusicService = require('../services/MusicService');


//Support more parameters ie. Limit how many listens you want to get back Maybe make it configurable in soem other way
//To support different queries, maybe on the relationships themselves ie. (Recent Follows, or Listened to in this time frame)

exports.Make = function(username) {

	var deferred = q.defer();
	
	var followsPromise = FollowService.GetFollowees(username);
		
	var listensPromise = ListenService.GetByUser(username);
	
	q.all([followsPromise, listensPromise]).then(	
		function success(d) {

			deferred.resolve({ 
				user: username,
				listenedTo: d[1].map(function(l) { return l.music; }),
				follows: d[0].map(function(f) { return f.to; })
			});
		
		}
	);
	
	return deferred.promise;
}

//MORE LIKE A USER SONG PROFILER BUSINESS OBJECT
//ACCESS TO: 
//USER
//FOLLOWS
//LISTENEDTO
//TAGFREQUENCYMAP
//
