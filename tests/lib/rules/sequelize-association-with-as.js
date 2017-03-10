var rule = require('../../../lib/rules/sequelize-association-with-as');
var RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("sequelize-association-with-as", rule, {
    valid: [
        'models.hasOne(models.X, {as: "createdBy"})'
    ],
    invalid: [
        {
            code: 'models.hasOne(models.X, {as: "CreatedBy"})',
            errors: [{message: 'association registered with an as. Old as value CreatedBy can be possibly replaced by createdBy'}]
        }, {
            code: 'models.hasOne(models.X, {as: "todo_history"})',
            errors: [{message: 'association registered with an as with an underscore'}]
        }
    ]
});