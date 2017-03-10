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
					return;
				}
				var PropertyExpression = node.arguments[1];
				asFound = _.find(PropertyExpression.properties, function(prop) {
					return helpers.isAsProperty(prop);
				});
				if (!asFound) {
					return;
				}
				if (asFound && asFound.value.value.indexOf('_') !== -1) {
					context.report(node, 'association registered with an as with an underscore');
					return;
				}
			}
		};
	}
};