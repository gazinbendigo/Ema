/**
 * Created by adm9360 on 2/11/2016.
 */

Meteor.methods({

    getRequestServicesByRequestId: function (env, requestId) {
        let environment = ValidationHelper.isEnvironmentBlank(env) ? DefaultEnv : env.envName;
        if(requestId === null || requestId === undefined){
            requestId = 0;
        }
        let path = BaseApiURI + environment + "/requestservices/" + requestId;
        return HTTPHelper.httpRequest("GET", path);
    },

    getRequestServiceAverages: function(env, params){
        let environment = ValidationHelper.isEnvironmentBlank(env) ? DefaultEnv : env.envName;
        path = BaseApiURI + environment + "/requestservices/averages";
        return HTTPHelper.httpRequest("GET", path, {params}).data;
    }
});