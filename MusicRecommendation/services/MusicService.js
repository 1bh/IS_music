var q = require('q');

var SongDataProvider = (function() {
	
	var Songs = [];
	
	return {
		Insert: function(song) {
			Songs.push(song);
		},
		Get: function() {
			return Songs;
		}
	}
	
})();

exports.Read = function() {
	var deferred = q.defer();
	
	try {
		var songs = SongDataProvider.Get();
		deferred.resolve(songs);
	} catch (err) {
		deferred.reject("bad");
	}
	
	return deferred.promise;
}

exports.Add = function(song) {
	var deferred = q.defer();
	
	try {
		SongDataProvider.Insert(song);
		deferred.resolve(song);
	} catch (err) {
		deferred.reject("bad");
	}
	
	return deferred.promise;
};



