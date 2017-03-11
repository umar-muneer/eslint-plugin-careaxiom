var rule = require('../../../lib/rules/mocha-not-with-only');
var RuleTester = require('eslint').RuleTester;

var ruleTester = new RuleTester();


var valid1 = 'describe("name", function() {})';
var valid2 = 'describe("name", function() {\
                it("name", function() {\
                  console.log("")\
                })\
             })';
var valid3 = 'describe("name", function() {\
                describe("name", function() {\
                  console.log("")\
                })\
             })';
var invalid1 = 'describe.only("name", function() {})';
var invalid2 = 'it.only("name", function() {})';

ruleTester.run("mocha-not-with-only", rule, {
    valid: [valid1, valid2, valid3],
    invalid: [
        {
            code: invalid1,
            errors: [{message: 'describe block found with .only'}]
        }, {
            code: invalid2,
            errors: [{message: 'it block found with .only'}]
        }
    ]
});