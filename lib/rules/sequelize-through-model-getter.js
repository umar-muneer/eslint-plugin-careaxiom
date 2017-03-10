var _ = require('lodash');
var helpers = require('./helpers');
module.exports = {
  create: function(context) {
    return {
      CallExpression: function(node) {
        if (!helpers.isOldAssociationMethod(node) || node.arguments.length <2) {
          return;
        }
        var PropertyExpression = node.arguments[1];
				throughFound = _.any(PropertyExpression.properties, function(prop) {
					return helpers.isThroughProperty(prop);
				});
        if (!throughFound) {
          return;
        }        
        context.report(node, 'join table model detected. add getter for join table model in both associated models. (Ask Umar or Waleed for details)');
      }
    };
  }
};