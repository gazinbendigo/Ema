/**
 * Created by adm9360 on 5/09/2016.
 */


Meteor.methods({

    updateEnvironment: function(environment){
        check(environment, {
            code: String,
            functionalName: String,
            technicalName: String,
            visibility: Number
        });
        //TODO: Check if certain parameters like code already exists within the collection
        let nextId = Environments.find({}).count() + 1;
        Environments.update(environment._id, {$set: {ENV_ID: nextId, ENV_CODE: environment.code, FUNCTIONAL_NAME: environment.functionalName, TECHNICAL_NAME: environment.technicalName, IS_VISIBLE: environment.visibility}});
    },

    deleteEnvironment: function(id){
        Environments.remove(id);
    },

    insertEnvironment: function(environment){
        check(environment, {
            code: String,
            functionalName: String,
            technicalName: String,
            visibility: Number
        });
        let nextId = Environments.find({}).count() + 1;
        Environments.insert({ENV_ID: nextId, ENV_CODE: environment.code, FUNCTIONAL_NAME: environment.functionalName, TECHNICAL_NAME: environment.technicalName, IS_VISIBLE: environment.visibility});
    },

});


// deleteEnvironment: function(id){
//     return HTTPHelper.httpRequest("DELETE", BaseApiURI + "environments/" + id).data;
// },
//
// updateEnvironment: function(params){
//     console.log(JSON.stringify(params));
//     //return HTTPHelper.httpRequest("POST", BaseApiURI + "environments/" + env.ENVIRONMENT_ID, HTTPHelper.jsonHeaders(params)).data;
//     return {code: 200};
// },
//
//
// getDefaultEnvironment: function(){
//     return Meteor.settings.defaultRegion;
// }

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