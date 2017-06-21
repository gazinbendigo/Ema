/**
 * Created by adm9360 on 21/09/2016.
 */

Meteor.methods({
    getApplications: function(param) {
        let environment = ValidationHelper.isEnvironmentBlank(param) ? DefaultEnv : param.env;
        console.log(environment);
        let path = BaseApiURI + "applications/" + environment;
        return HTTPHelper.httpRequest("GET", path);
    }
});