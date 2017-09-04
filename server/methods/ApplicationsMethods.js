/**
 * Created by adm9360 on 21/09/2016.
 */

Meteor.methods({
    getApplications: function(obj) {
        let environment = ValidationHelper.isEnvironmentBlank(obj) ? DefaultEnv : obj.env;
        let path = BaseApiURI + "applications/" + environment;
        return HTTPHelper.httpRequest("GET", path);
    }
});