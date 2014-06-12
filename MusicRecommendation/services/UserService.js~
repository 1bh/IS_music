var q = require('q');

var FollowService = require('../services/FollowService');
var ListenService = require('../services/ListenService');
var MusicService = require('../services/MusicService');

exports.Get = function(username) {

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

//Would be maybe nice to have another abstraction that is more of a user geared towards recommendation making purposes
//ie
//ACCESS TO: 
//USER
//FOLLOWS
//LISTENEDTO
//TAGFREQUENCYMAP
//any other future properties that arent necessarily modeled by incoming resources
