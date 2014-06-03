var followController = require('./FollowController.js');

var listenController = require('./ListenController.js');

var recommendationsController = require('./RecommendationsController.js');

module.exports.set = function (app) {
	followController.set(app);
	listenController.set(app);
	recommendationsController.set(app);
}