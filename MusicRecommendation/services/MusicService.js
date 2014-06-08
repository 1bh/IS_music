var q = require('q');

var SongDataProvider = (function() {
	
	var Songs = [];
	var GenreBucketSongs = {};
	
	function indexSongByGenre(song) {
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
			indexSongByGenre(song);
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

exports.GetBySongName = function(name) {
	var deferred = q.defer();
	
	try {
		var songs = SongDataProvider.Get();
		var song = songs.filter(function(s) {
			return s.Song == name;
		});
		if (song[0] == undefined) throw err;
		
		deferred.resolve(song);
	} catch ( err ) {
		deferred.reject("Problem fetching songs by name");
	}
	
	return deferred.promise;
}

exports.GetBySongNames = function(namelist) {
	var deferred = q.defer();
	
	try {
		var songs = SongDataProvider.Get();
		songs = songs.filter(function(s) {
			return namelist.indexOf(s.Song) != -1;
		});
		deferred.resolve(songs);
	} catch ( err ) {
		deferred.reject("Problem fetching songs by name");
	}
	
	return deferred.promise;
}

//Returns all songs that match at least one of the tags in TagList
exports.GetByTagsOR = function(TagList) {

}

//Returns all songs that match all of the tags in TagList
exports.GetByTagsAND = function(TagList) {

}







