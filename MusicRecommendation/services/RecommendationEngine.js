//Make recommendations based on:
//What music they have listened to before
//People who the user follow in the first degree
//Possibly nth degree
//Maximize for discovery of new songs
var FollowService = require('../services/FollowService');

var ListenService = require('../services/ListenService');



exports.MakeRecommendationEngine = function() {
	return new RecommendationEngine();
};

function RecommendationEngine() {
	
	this.MakeRecommendations = function() {
		return [];
	}
}
