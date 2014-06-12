var FollowDataProvider = require('../provider/FollowDataProvider');

var q = require('q');


exports.Create = function(follow) {
	var deferred = q.defer();
	
	try {
		var d = FollowDataProvider.Insert(follow);
		deferred.resolve(d);
	} catch (err) {
		deferred.reject(err);
	}
	
	return deferred.promise;
};

exports.Get = function() {
	try {
		var deferred = q.defer();
		
		var followees = FollowDataProvider.Get();
		
		deferred.resolve(followees);
	} catch (err) {
		deferred.reject();
	}
	
	return deferred.promise;
}

exports.GetFollowees = function(user) {

	var deferred = q.defer();
	
	var followees = FollowDataProvider.Get()
		.filter(function(f) {
			return f.from == user;
		});
		
	deferred.resolve(followees);

	return deferred.promise;
}



