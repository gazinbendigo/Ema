/**
 * Created by adm9360 on 21/09/2016.
 */

Meteor.methods({
    getApplications: function(env) {
        let environment = ValidationHelper.isEnvironmentBlank(env) ? DefaultEnv : env.region;
        let path = BaseApiURI + "applications/" + environment;
        return HTTPHelper.httpRequest("GET", path);
        //return Applications.find({});
    }
});