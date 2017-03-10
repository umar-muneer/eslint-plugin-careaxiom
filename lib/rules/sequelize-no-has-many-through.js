var _ = require('lodash');
var helpers = require('./helpers');
module.exports = {
  create: function(context) {
    return {
      CallExpression: function(node) {
        if (!helpers.isOldAssociationMethod(node)) {
          return;
        }
        if (node.callee.property.name !== 'hasMany' || node.arguments.length < 2) {
          return;
        }
        var PropertyExpression = node.arguments[1];
				throughNotFound = !_.find(PropertyExpression.properties, function(prop) {
					return helpers.isThroughProperty(prop);
				});
        if (throughNotFound) {
          return;
        }
        context.report(node, 'has many with through detected, use belongsToMany instead!');
      }
    };
  }
};