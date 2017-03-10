var inflection = require('inflection');

var _isIncludeNode = function(node) {
	return node.type === 'Identifier' ? (node.name === 'include' || node.value === 'include') : false;
};
var _belongsToIncludeNode = function(node) {
	if (_isIncludeNode(node)) {
		return false;
	}
	if (node.parent.type === 'Property') {
		var possibleIncludeNodeKey = node.parent.key;
		return possibleIncludeNodeKey.name === 'include' || possibleIncludeNodeKey.value === 'include';	
	}
	if (node.parent.type === 'AssignmentExpression') {
		var possibleIncludeNode = node.parent.left;
		return possibleIncludeNode.type === 'Identifier' && possibleIncludeNode.name === 'include';
	}
	return false;	
};
var _isAsProperty = function(prop) {
	return prop.key.name === 'as' || prop.key.value === 'as';
};
var _isThroughProperty = function(prop) {
	return prop.key.name === 'through' || prop.key.value === 'through';
};
var _isOldAssociationMethod = function(node) {
	if (!node.callee.property) {
		return false;
	}
	return node.callee.property.name === 'hasMany' || node.callee.property.name === 'hasOne' || node.callee.property.name === "belongsTo";
};
var _getAsValues = function(node) {
	return {
		old: node.value.value,
		recommended: inflection.camelize(node.value.value, true)
	};
};
module.exports = {
  isIncludeNode: _isIncludeNode,
  belongsToIncludeNode: _belongsToIncludeNode,
  isAsProperty: _isAsProperty,
	isOldAssociationMethod: _isOldAssociationMethod,
	isThroughProperty: _isThroughProperty,
	getAsValues: _getAsValues
};