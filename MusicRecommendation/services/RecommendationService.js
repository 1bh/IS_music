var recommendationEngine = require('../services/RecommendationEngine');

var q = require('q');

exports.Get = function(user) {
	var deferred = q.defer();

	var engine = recommendationEngine.GetEngine(user);
	
	engine.getRecommendation()
		.then(function(recs) {
			deferred.resolve(recs);
		});

	return deferred.promise;
}
