var rule = require('../../../lib/rules/sequelize-association-without-as');
var RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("sequelize-association-with-as", rule, {
    valid: [
        'models.hasOne(models.X, {as: "test"})'
    ],
    invalid: [
        {
            code: 'models.hasOne(models.X)',
            errors: [{message: 'sequelize association registered without as and has only one argument'}]
        }
    ]
});