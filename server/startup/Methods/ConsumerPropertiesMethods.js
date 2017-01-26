/**
 * Created by adm9360 on 26/08/2016.
 */

Meteor.methods({
    getConsumerPropertiesByEnvironment: function(env){
        let environment = ValidationHelper.isEnvironmentBlank(env) ? DefaultEnv : env.env;
        let path = BaseApiURI + "consumerProperties/" + environment;
        return HTTPHelper.httpRequest('GET', path);
    },

    getPropertiesByConsumer: function(env){
        let environment = ValidationHelper.isEnvironmentBlank(env) ? DefaultEnv : env.env;
        let path = BaseApiURI + "propertiesByConsumer/" + environment;
        //console.log(path);
        return HTTPHelper.httpRequest('GET', path);
    },

    getConsumerPropertiesByConsumer: function(env, consumer){
        let environment = ValidationHelper.isEnvironmentBlank(env) ? DefaultEnv : env.env;
        let params = {brandCde: consumer.brandCde, appCde: consumer.appCde, instanceCde: consumer.instanceCde};
        let path = BaseApiURI  + "environments/" + environment + "/consumers";
        return HTTPHelper.httpRequest('GET', path, {consumer});
    },

    getConsumerById: function(env, consumerId){
        let environment = ValidationHelper.isEnvironmentBlank(env) ? DefaultEnv : env.env;
        let path = BaseApiURI  + "environments/" + environment + "/consumers/" + consumerId;
    },

    addConsumerProperty: function(property){
        // if(isEnvBlank(params)){
        //     params.env = defaultEnv;
        // }
        //ConsumerProperties.insert(property);
        //return httpRequest(GET, baseApiURI + envPath, {params});
    },

    updateConsumerProperty (property, updateAll){
        // if(isEnvBlank(params)){
        //     params.env = defaultEnv;
        // }
        ConsumerProperties.update(property._id, {
            $set: {PROPERTY_NAME: property.PROPERTY_NAME},
            $set: {PROPERTY_VALUE: property.PROPERTY_VALUE}
        });
        //return httpRequest(GET, baseApiURI + envPath, {params});
    },

    deleteConsumerProperty (property, deleteAll){
        // if(isEnvBlank(params)){
        //     params.env = defaultEnv;
        // }
        ConsumerProperties.remove(property._id);
        //return httpRequest(GET, baseApiURI + envPath, {params});
    }

});


