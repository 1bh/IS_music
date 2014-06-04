var FollowDataSource = [];
var q = require('q');

exports.Create = function(follow) {
	var deferred = q.defer();
	try {
		if (FollowDataSource.length == 10) { 
			throw err; 
		}	
		FollowDataSource.push(follow);
		deferred.resolve("good");
	} catch (err) {
		deferred.reject("bad");
	}
	return deferred.promise;
	/*
	try {
		if (FollowDataSource.length == 2) { 
			throw err; 
		}	
		FollowDataSource.push(follow);
		success();
	} catch (err) {
		failure();
	}
	*/
};

exports.Get = function() {
	return FollowDataSource;
};
