//var FollowDataSource = [];
var FollowDataProvider = (function() {
	var Follows = [];
	
	return {
		GetByTo: function(to) {
			return Follows.filter(function(n) {
				return n.to == to;
			});	
		},
		GetByFrom: function(from) {
			return Follows.filter(function(n) {
				return n.from == from;
			});
		},
		Insert: function(follow) {
			Follows.push(follow);
		}
	}
})();

var q = require('q');

exports.Create = function(follow) {
	var deferred = q.defer();
	try {
		if (FollowDataProvider.GetByTo('ivan').length == 2) { 
			throw err; 
		}	
		FollowDataProvider.Insert(follow);
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
	return FollowDataProvider.GetByTo('ivan');
};
