var rule = require('../../../lib/rules/no-promise-bind-this');
var RuleTester = require('eslint').RuleTester;

var ruleTester = new RuleTester();


var valid1 = 'Promise.all()';
var valid2 = `function x() {console.log();}`;
var valid3 = `function x() {
    function z() {
        return Promise.resolve()
        .then(function() {
            console.log('haha testing');
        })
    }
}`;
var invalid1 = 'Promise.bind(this)';
var invalid2 = `Promise.bind(this)
                .then(function() { console.log() })`;
var invalid3 = `function z() {
    return x.y()
    .then(function() {
        return Promise.bind(this)
        .then(function() {
            this.a = 1;
            this.b = 6;
        })
    })
}`;
var invalid4 = 'Promise.bind({})';
ruleTester.run("no-promise-bind-this", rule, {
    valid: [],
    invalid: [
        {
            code: invalid1,
            errors: [{message: 'janab, Promise.bind(this) detected.. remove kar dain agar race condition say bachna hai !!!!'}]
        }, {
            code: invalid2,
            errors: [{message: 'janab, Promise.bind(this) detected.. remove kar dain agar race condition say bachna hai !!!!'}]
        }, {
            code: invalid3,
            errors: [{message: 'janab, Promise.bind(this) detected.. remove kar dain agar race condition say bachna hai !!!!'}]
        }, {
            code: invalid4,
            errors: [{message: 'Promise.bind detect.. could possibly result in race conditions'}]
        }
    ]
});