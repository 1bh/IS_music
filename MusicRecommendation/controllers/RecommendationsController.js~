var recommendationService = require('../services/RecommendationService');

module.exports.set = function(app, q) {

	app.get('/recommendations', function(request, response) {
		
		recommendationService.Get(request.query.user)
			.then(
				function success(d) { response.json(d); },
				function failure(d) { response.send("failure"); }
			)
	});
}

