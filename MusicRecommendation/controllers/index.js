
var followController = require('./FollowController.js');
var listenController = require('./ListenController.js');
var recommendationsController = require('./RecommendationsController.js');

module.exports.set = function (app, q) {
	followController.set(app, q);
	listenController.set(app, q);
	recommendationsController.set(app, q);
}
