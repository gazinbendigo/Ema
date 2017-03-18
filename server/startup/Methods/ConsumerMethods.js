/**
 * Created by adm9360 on 30/08/2016.
 */

Meteor.methods({
    getConsumers: function(env){
        let environment = ValidationHelper.isEnvironmentBlank(env) ? DefaultEnv : env.region;
        let path = BaseApiURI + "environments/" + environment + "/consumers";
        return HTTPHelper.httpRequest("GET", path);
    }
});