var recommendationService = require('../services/RecommendationService');

module.exports.set = function(app, q) {

	app.get('/recommendations', function(request, response) {

		recommendationService.Get(5)
			.then(
				function success(d) { 
					response.statusCode = 200;
					response.json(d); 
				},
				function failure(d) { response.send("failure"); }
			)

	});
}

