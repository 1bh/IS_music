//This is probably poorly named. This is supposed to be a class that is responsible for generating a USER 
//It will aggregate a bunch of the users information to make it easier to access.
//This object could also be probably timestamped and cached/stored to be used in subsequent recommendation requests
//Where staleness is tolerable

var q = require('q');

var FollowService = require('../services/FollowService');
var ListenService = require('../services/ListenService');
var MusicService = require('../services/MusicService');


//Support more parameters ie. Limit how many listens you want to get back Maybe make it configurable in soem other way
//To support different queries, maybe on the relationships themselves ie. (Recent Follows, or Listened to in this time frame)

exports.Make = function(username) {
	var deferred = q.defer();
	
	//For now there is no actual user, but we do have soem names, and we do have information for a user such as follows and listens
	
	var followsPromise = 
		FollowService.GetFollowees(user);
	
	var listensPromise = 
		ListenService.GetByUser(user);
	
	q.all([followsPromise, listensPromise]).then(	
			function success(follows, listens) {
				return { 
					user: username,
					follows: Follows,
					listenedTo: Listens
				};
			
			}
	);
		
	return deferred.promise;
}
