module.exports.set = function(app) {
   
	app.post('/follow', function(request, response) {
		response.statusCode = 500;
		response.send('Not implemented');
	});

}
