var helpers = require('./helpers.js');
module.exports = {
  create: function(context) {
    return {
      Identifier: function(node) {
        if (helpers.isIncludeNode(node)) {
          context.report(node, 'possible include usage detected');
        }
      }
    };
  }
};