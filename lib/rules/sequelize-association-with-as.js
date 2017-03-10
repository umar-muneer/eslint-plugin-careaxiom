var _ = require('lodash');
var inflection = require('inflection');
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
				asNode = _.find(PropertyExpression.properties, function(prop) {
					return helpers.isAsProperty(prop);
				});
				if (!asNode) {
					return;
				}
				if (asNode && asNode.value.value.indexOf('_') === -1) {					
					var asValues = helpers.getAsValues(asNode);
					if (asValues.old === asValues.recommended) {
						return;
					}
					context.report(node, 'association registered with an as. Old as value ' + asValues.old + ' can be possibly replaced by ' + asValues.recommended);
					return;
				}
			}
		};
	}
};