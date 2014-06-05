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

	app.post('/follow', function(request, response) {
		
		var user = request.body.user;
		var music = request.body.music;
		
		var listen = {
			user : user,
			music : music
		};
		
		listenService.Create(listen)
			.then(
				function success(d) { response.send("success"); },
				function failure(d) { response.send("failure"); }
			);
	});
}

