module.exports.set = function(app) {

	app.post('/listen', function(request, response) {
		response.statusCode = 500;
		response.send('Not implemented');
	});

}
