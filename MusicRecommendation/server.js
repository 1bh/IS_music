//Just a quick hello world for now
require('express')()
	.get('/', function(request, response) {
		response.type('text/plain');
		response.send('Hello Hello ivan');
	})
	.listen(8000);
	
console.log("Check 8000");
