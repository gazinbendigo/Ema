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



