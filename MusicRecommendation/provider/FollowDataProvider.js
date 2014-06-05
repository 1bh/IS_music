var Follows = [];

exports.Get = function() {
	return Follows;
}
	
exports.Insert = function(follow) {
	Follows.push(follow);
};





/*
exports.GetByTo = function(to) {
	return Follows.filter(function(n) {
		return n.to == to;
	});	
};
		
exports.GetByFrom = function(from) {
	return Follows.filter(function(n) {
		return n.from == from;
	});
};
	
*/


/* before without require
var FollowDataProvider = (function() {
	var Follows = [];
	
	return {
		GetByTo: function(to) {
			return Follows.filter(function(n) {
				return n.to == to;
			});	
		},
		GetByFrom: function(from) {
			return Follows.filter(function(n) {
				return n.from == from;
			});
		},
		Insert: function(follow) {
			Follows.push(follow);
		}
	}
})();
*/