var ListenDataProvider = require('../provider/ListenDataProvider');
var q = require('q');

exports.Create = function(listen) {
	var deferred = q.defer();
	
	try {
		var l = ListenDataProvider.Insert(listen);
		
		deferred.resolve(l);
	} catch (err) {
		deferred.reject();
	}
	
	return deferred.promise;
}

exports.GetByUser = function(username) {
	var deferred = q.defer();
	
	try {
		var listens = ListenDataProvider.Get();
		listens = listens.filter(function(l) {
			return l.user == username;
		});

		deferred.resolve(listens);
	} catch (err) {
		deferred.reject();
	}
	
	return deferred.promise;
}
