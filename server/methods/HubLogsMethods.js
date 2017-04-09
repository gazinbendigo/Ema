/**
 * Created by holly on 10/01/2016.
 */

var Future = Npm.require('fibers/future');

Meteor.methods({
    getHubLogs: function(env, params) {
        let environment = ValidationHelper.isEnvironmentBlank(env) ? DefaultEnv : env.envName;
        let path = BaseApiURI + "hublogs/" + environment + "?";
        return HTTPHelper.httpRequest("GET", path, {params});
    }

});

// // Get list of all method names on Lists
// const LISTS_METHODS = _.pluck([
//     getHubLogs,
// ], 'name');
//
// // Only allow 5 list operations per connection per second
// DDPRateLimiter.addRule({
//     name(name) {
//         return _.contains(LISTS_METHODS, name);
//     },
//
//     // Rate limit per connection ID
//     connectionId() { return true; },
// }, 5, 1000);



