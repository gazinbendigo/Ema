/**
 * Created by holly on 10/01/2016.
 */

var Future = Npm.require('fibers/future');

Meteor.methods({
    getHubLogs: function(obj, params) {
        let environment = ValidationHelper.isEnvironmentBlank(obj) ? DefaultEnv : obj.env;
        let path;
        if(params){
            path = BaseApiURI + "hublogs/" + environment + "?";
        }
        else {
            path = BaseApiURI + "hublogs/" + environment;
        }
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



