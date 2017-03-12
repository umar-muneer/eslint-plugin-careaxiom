var _ = require('lodash');
module.exports = {
    create: function(context) {
        return {
            CallExpression: function(node) {
                if (_.isEmpty(node.callee.object)) {
                    return;
                }
                if (node.callee.object.name === 'describe' && node.callee.property.name === 'only') {
                    context.report(node, 'describe block found with .only');
                    return;
                }
                if (node.callee.object.name === 'it' && node.callee.property.name === 'only') {
                    context.report(node, 'it block found with .only');
                    return;
                }
            }
        }
    }
};