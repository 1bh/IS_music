var recommendationEngine = require('../services/RecommendationEngine');

var q = require('q');

exports.Get = function(user) {
	var deferred = q.defer();

	var recommendations = recommendationEngine.Get2(user);
	
	recommendations.then(function(recs) {
		deferred.resolve(recs);
	});
		
	return deferred.promise;
}
