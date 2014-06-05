//var FollowDataSource = [];
var FollowDataProvider = require('../provider/FollowDataProvider');
var q = require('q');

exports.Create = function(follow) {
	var deferred = q.defer();
	try {
		FollowDataProvider.Insert(follow);
		deferred.resolve("good");
	} catch (err) {
		deferred.reject("bad");
	}
	return deferred.promise;
};

exports.GetFollowees = function(from) {
	try {
		var deferred = q.defer();
		var followees = FollowDataProvider.Get()
			.filter(function(f) {
				return f.from == from;
			});
		deferred.resolve(followees);
	} catch (err) {
		deferred.reject();
	}
	return deferred.promise();
}



