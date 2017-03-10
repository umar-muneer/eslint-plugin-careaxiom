var _ = require('lodash');
var helpers = require('./helpers');
module.exports = {
	create: function(context) {
		return {
			Identifier: function(node) {
				if (!helpers.belongsToIncludeNode(node)) {
					return;
				}
				context.report(node, 'Case 1: include without as found.');
			},
			MemberExpression: function(node) {
				if (!helpers.belongsToIncludeNode(node)) {
					return;
				}
				context.report(node, 'Case 1: include without as found');
			},
			CallExpression: function(node) {
				if (!helpers.belongsToIncludeNode(node)) {
					return;
				}
				context.report(node, 'Case 1: include without as found');
			},
			ObjectExpression: function(node) {
				if (!helpers.belongsToIncludeNode(node)) {
					return;
				}
				var asNotFound = !_.find(node.properties, function(prop) {
					return helpers.isAsProperty(prop);
				});
				if (asNotFound) {
					context.report(node, 'Case 2: include without as found.');
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
							return !_.find(el.properties, function(prop) {
								return helpers.isAsProperty(prop);
							});
						default:
							return true;
					}
				});
				_.each(asElements, function(el) {
					switch(el.type) {
						case 'ObjectExpression':
							context.report(el, 'Case 3 | Case 2: include without as found.');
						break;
						default: 
							context.report(el, 'Case 3 | Case 1: include without as found.');
					}
				});
			}	
		};
	}
};