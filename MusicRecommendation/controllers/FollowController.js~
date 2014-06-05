
var followService = require('../services/FollowService');

module.exports.set = function(app) {
   
    app.get('/follow', function(request, response) {
		response.send(followService.Get());
    });
        
	app.post('/follow', function(request, response) {
		
		var from = request.body.from;
		var to = request.body.to;
		
		var follow = {
			from : from,
			to : to
		};
		
		followService.Create(follow)
			.then(
				function success(d) { response.send("success"); },
				function failure(d) { response.send("failure"); }
			);
    	
    	
	});

}
