var _ = require('lodash');
var helpers = require('./helpers');
module.exports = {
	create: function(context) {
		return {
			ObjectExpression: function(node) {
				if (!helpers.belongsToIncludeNode(node)) {
					return;
				}
				var asNode = _.find(node.properties, function(prop) {
					return helpers.isAsProperty(prop);
				});
				if (asNode) {
					var asValues = helpers.getAsValues(asNode);
					context.report(node, 'include with as detected. Old as value ' + asValues.old + ' can be possibly replaced by ' + asValues.recommended);
				}
			},
			ArrayExpression: function(node) {
				if (!helpers.belongsToIncludeNode(node)) {
					return;
				}
				//Case 3
				var asElements = _.filter(node.elements, function(el) {
					switch(el.type) {
						case 'ObjectExpression':
							return _.any(el.properties, function(prop) {
								return helpers.isAsProperty(prop);
							});
						default:
							return false;
					}
				});
				_.each(asElements, function(el) {
					var asProperty = _.find(el.properties, function(prop) {
						return helpers.isAsProperty(prop);
					});
					var asValues = helpers.getAsValues(asProperty);
					context.report(el, 'include with as detected. Old as value ' + asValues.old + ' can be possibly replaced by ' + asValues.recommended);
				});
			}	
		};
	}
};