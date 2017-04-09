/**
 * Created by adm9360 on 5/09/2016.
 */

Meteor.methods({
    getEnvironments: function(){
        return HTTPHelper.httpRequest("GET", BaseApiURI + "environments");
    },

    createHubEnvironment: function(params){
        return HTTPHelper.httpRequest("POST", BaseApiURI + "createVMEnvironment", HTTPHelper.jsonHeaders(params)).data;
    },

    createVMVEnvironment: function(params){
        return HTTPHelper.httpRequest("POST", BaseApiURI + "createVMEnvironment", HTTPHelper.jsonHeaders(params)).data;
    },

    createUberHubEnvironment: function(params){
        return HTTPHelper.httpRequest("POST", BaseApiURI + "CreateHubEnvironment", HTTPHelper.jsonHeaders(params)).data;
    },

    deleteEnvironment: function(id){
        return HTTPHelper.httpRequest("DELETE", BaseApiURI + "environments/" + id).data;
    },

    updateEnvironment: function(params){
        console.log(JSON.stringify(params));
        //return HTTPHelper.httpRequest("POST", BaseApiURI + "environments/" + env.ENVIRONMENT_ID, HTTPHelper.jsonHeaders(params)).data;
        return {code: 200};
    },

    updateUberHubEnvironment: function(params){
        console.log(JSON.stringify(params));
        //return HTTPHelper.httpRequest("POST", BaseApiURI + "environments/uberhub/" + env.ENVIRONMENT_ID, HTTPHelper.jsonHeaders(params)).data;
        return {code: 200};
    },

    getDefaultEnvironment: function(){
        return Meteor.settings.defaultRegion;
    }

});

// // Get list of all method names on Lists
// const LISTS_METHODS = _.pluck([
//     getEnvironments,
//     createHubEnvironment,
//     createVMVEnvironment,
//     deleteEnvironment,
//     updateEnvironment,
//     updateUberHubEnvironment,
//     getDefaultEnvironment
// ], 'name');
//
// // Only allow 5 list operations per connection per second
// DDPRateLimiter.addRule({
//     name(name) {
//         return _.contains(LISTS_METHODS, name);
//     },
//
//     // Rate limit per connection ID
//     connectionId() { return true; },
// }, 5, 1000);