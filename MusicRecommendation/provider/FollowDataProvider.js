var Follows = [];

var followsid = 0;

exports.Get = function() {
	return Follows;
}
	
exports.Insert = function(follow) {
	var id = followsid++;
	follow.id = id;
	
	Follows.push(follow);
	console.log(Follows);
	return follow;
};
