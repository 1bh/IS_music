var recommendationEngine = require('../services/RecommendationEngine');

var q = require('q');

exports.Get = function(user) {
	var deferred = q.defer();

	var recommendations = recommendationEngine.Get(user);
	
	recommendations.then(function(recs) {
		deferred.resolve(recs);
	});
		
	return deferred.promise;
}
