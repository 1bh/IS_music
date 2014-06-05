var recommendationEngine = require('../services/RecommendationEngine');
var FollowDataProvider = require('../provider/FollowDataProvider');

var q = require('q');

exports.Get = function(amount) {
	var deferred = q.defer();
	
	try {
		//var recommendations = recommendationEngine.Make(amount);
		var followees = FollowDataProvider.Get();
		deferred.resolve(followees);
	} catch (err) {
		deferred.reject();
	}
	
	return deferred.promise;
}
