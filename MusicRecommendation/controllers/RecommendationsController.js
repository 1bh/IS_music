module.exports.set = function(app) {

	app.get('/recommendations', function(request, response) {
		response.statusCode = 500;
		response.json({error:"not implemented"});
	});

}
