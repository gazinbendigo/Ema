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

    //http://localhost:10010/HUBLD/performance/overall?requestDte=2017-07-13+14:33:39.297&timeCde=m&duration=46
    //http://localhost:10010/HUBLD/performance/overall?timeCde=m&duration=46
    getOverallPerformance: (env, params) => {

        let environment = ValidationHelper.isEnvironmentBlank(env) ? DefaultEnv : env;
        let path = BaseApiURI + "/" + environment + "/performance/overall";

        return HTTPHelper.httpRequest("GET", (path + "?"), params);
    },

    //http://localhost:10010/HUBLD/performance/container?requestDte=2017-07-13+14:33:39.297&hours=24
    //http://localhost:10010/HUBLD/performance/container?hours=24
    getContainerPerformance: (env, params) => {

        let environment = ValidationHelper.isEnvironmentBlank(env) ? DefaultEnv : env;
        let path = BaseApiURI + "/" + environment + "/performance/container";

        return HTTPHelper.httpRequest("GET", (path + "?"), params);
    },

    //http://localhost:10010/HUBLD/performance/component?requestDte=2017-07-13+17:19:55.593&hours=24
    //http://localhost:10010/HUBLD/performance/component?hours=24
    getComponentPerformance: (env, params) => {

        let environment = ValidationHelper.isEnvironmentBlank(env) ? DefaultEnv : env;
        let path = BaseApiURI + "/" + environment + "/performance/component";

        return HTTPHelper.httpRequest("GET", (path + "?"), params);
    },

})