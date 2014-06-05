var recommendationEngine = require('../services/RecommendationEngine');

var FollowDataProvider = require('../provider/FollowDataProvider');

var q = require('q');

exports.Get = function(amount) {
	var deferred = q.defer();
	
	try {
		//var recommendations = recommendationEngine.Make(amount);
		var recommendations = FollowDataProvider.Get();
		deferred.resolve(recommendations);
	} catch (err) {
		deferred.reject();
	}
	
	return deferred.promise;
}