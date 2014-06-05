/*
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
var Follows = [];

exports.Get = function() {
	return Follows;
}

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
		
exports.Insert = function(follow) {
	Follows.push(follow);
};
