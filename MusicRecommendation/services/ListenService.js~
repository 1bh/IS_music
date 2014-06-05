var ListenDataProvider = (function() {
	
	var Listens = [];
	
	return {
		Insert: function(listen) {
			Listens.push(listen);
		};
	}
	
})();

var q = require('q');

exports.Create = function(insert) {
	var deferred = q.defer();
	
	try {
		ListenDataProvider.Insert(listen);
		deferred.resolve(listen);
	} catch (err) {
		deferred.reject("bad");
	}
	
	return deferred.promise;
}
