/**
 * Created by holly on 21/06/17.
 */

Meteor.methods({

    getConsumerProperties: function(env){
        let environment = ValidationHelper.isEnvironmentBlank(env) ? DefaultEnv : env;
        let path = BaseApiURI + "consumer/properties/" + environment;

        return  HTTPHelper.httpRequest("GET", path);
    }

});