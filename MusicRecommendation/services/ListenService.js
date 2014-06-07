var ListenDataProvider = require('../provider/ListenDataProvider');
var q = require('q');

exports.Create = function(insert) {
	var deferred = q.defer();
	
	try {
		var l = ListenDataProvider.Insert(listen);
		deferred.resolve(l);
	} catch (err) {
		deferred.reject("bad");
	}
	
	return deferred.promise;
}

exports.Get = function(user) {
	
};

exports.GetByUser = function(user) {
	
};
