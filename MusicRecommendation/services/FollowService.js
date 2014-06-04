var FollowDataSource = [];

exports.Create = function(follow, success, failure) {
	try {
		if (FollowDataSource.length == 2) { 
			throw err; 
		}	
		FollowDataSource.push(follow);
		success();
	} catch (err) {
		failure();
	}
};

exports.Get = function() {
	return FollowDataSource;
};
