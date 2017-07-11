/**
 * Created by holly on 7/07/17.
 */

Meteor.methods({

    //Sample API Call: http://localhost:10010/HUBDL/performance/overall?requestDte=2016-04-16T16%3A06%3A05&timePrd=m

    getServicePerformanceStats: (env, params) => {
        let environment = ValidationHelper.isEnvironmentBlank(env) ? DefaultEnv : env;
        let path = BaseApiURI + "hublogs/" + environment + "/service/performance";

        return HTTPHelper.httpRequest("GET", (path + "?"), params);
    },

    getOverallPerformance: (env, params) => {

        let environment = ValidationHelper.isEnvironmentBlank(env) ? DefaultEnv : env;
        let path = BaseApiURI + "/" + environment + "/performance/overall";

        return HTTPHelper.httpRequest("GET", (path + "?"), params);
    },

    getContainerPerformance: (env, params) => {

        let environment = ValidationHelper.isEnvironmentBlank(env) ? DefaultEnv : env;
        let path = BaseApiURI + "/" + environment + "/performance/container";

        return HTTPHelper.httpRequest("GET", (path + "?"), params);
    },

    getComponentPerformance: (env, params) => {

        let environment = ValidationHelper.isEnvironmentBlank(env) ? DefaultEnv : env;
        let path = BaseApiURI + "/" + environment + "/performance/component";

        return HTTPHelper.httpRequest("GET", (path + "?"), params);
    },

})