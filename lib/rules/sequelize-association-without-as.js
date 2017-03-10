var _ = require('lodash');
var helpers = require('./helpers');
module.exports = {
	create: function(context) {
		return {
			CallExpression: function(node) {
				if (!helpers.isOldAssociationMethod(node)) {
					return;
				} 
				if (node.arguments.length < 2) {
					context.report(node, 'sequelize association registered without as');
					return;
				}
				var PropertyExpression = node.arguments[1];
				asFound = _.find(PropertyExpression.properties, function(prop) {
					return helpers.isAsProperty(prop);
				});
				if (asFound) {
					return;
				}
				context.report(node, 'sequelize association registered without as');
			}
		};
	}
};