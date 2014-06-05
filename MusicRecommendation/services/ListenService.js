var ListenDataProvider = require('../provider/ListenDataProvider');
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

exports.Get = function() {
	
};
