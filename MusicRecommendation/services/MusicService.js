var q = require('q');

var SongDataProvider = (function() {
	
	var Songs = [];
	var GenreBucketSongs = {};
	
	function updateTagBuckets(song) {
		var tags = song.Tags;
		
		tags.forEach(function(element,index) { 
			if (GenreBucketSongs[element] == undefined) {
				GenreBucketSongs[element] = [];
			}
			GenreBucketSongs[element].push(song.Song);
		});
	}
	
	return {
		Insert: function(song) {
			Songs.push(song);
			updateTagBuckets(song);
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



