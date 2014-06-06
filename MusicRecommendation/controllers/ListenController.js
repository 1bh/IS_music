var listenService = require('../services/ListenService');

module.exports.set = function(app, q) {

	app.post('/follow', function(request, response) {
		
		var user = request.body.user;
		var music = request.body.music;
		
		var listen = {
			user : user,
			music : music
		};
		
		listenService.Create(listen)
			.then(
				function success(d) { response.send(d); },
				function failure(d) { response.send("failure"); }
			);
	});
}
