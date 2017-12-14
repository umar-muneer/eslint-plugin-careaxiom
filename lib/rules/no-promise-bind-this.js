const _ = require('lodash');
module.exports = {
	create: (context) => {
		//this is such a pathetic code if i might say so myself !!!!
		const isPromise = (fn = () => true) => (callee, args) => {
			return fn.call(null, callee, args) && callee.object && callee.object.name === 'Promise'
		};
		const isBind = (fn = () => true) => (callee, args) => {
			return fn.call(null, callee, args) && callee.property && callee.property.name === 'bind'
		};
		const isThis = (fn = () => true) => (callee, args) => {
			return fn.call(null, callee, args) && args.length > 0 && _.find(args, arg => arg.type === 'ThisExpression')
		};
		return {
			CallExpression: (node) => {
				const callee = node.callee;
				const args = node.arguments;
				if (node.callee.type !== 'MemberExpression') {
					return;
				}
				if (isPromise(isBind(isThis()))(callee, args)) {
					context.report(node, 'janab, Promise.bind(this) detected.. remove kar dain agar race condition say bachna hai !!!!');
					return;
				}
				if (isPromise(isBind())(callee, args)) {
					context.report(node, 'Promise.bind detect.. could possibly result in race conditions');
					return;			
				}
			}
		}
	}
}