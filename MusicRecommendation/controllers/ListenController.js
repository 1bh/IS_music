var listenService = require('../services/ListenService');

module.exports.set = function(app, q) {

	app.post('/listen', function(request, response) {
		
		var user = request.body.user;
		var music = request.body.music;
		
		var listen = {
			user : user,
			music : music
		};
		
		listenService.Create(listen)
			.then(
				function success(d) { response.statusCode = 201; response.json(d); },
				function failure(d) {  response.statusCode = 500; response.send("failure"); }
			);
	});
}
