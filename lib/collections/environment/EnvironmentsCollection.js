/**
 * Created by holly on 10/01/2016.
 */


//Environments = new Mongo.Collection(null);
Environments = new Mongo.Collection("environments");

//Store a variable that can be used between multiple views
// Environments.updateEnvironmentView = new ReactiveVar(null);
// //Store the selected Environment when updating an environment
// Environments.environmentItem = new ReactiveVar(null);
//
// Environments.isLoaded = new ReactiveVar(false);
// Environments.isLoading = new ReactiveVar(false);

Environments.allow({
    insert: () => false,
    update: () => false,
    remove: () => false
});

Environments.deny({
    insert: () => true,
    update: () => true,
    remove: () => true
});

Environments.update = function(params){
    Meteor.call("updateEnvironment", params, (err, result) => {
        if(err){
            console.log(err);
        }
    });
}

// Environments.insert = function(params){
//     Meteor.call("insertEnvironment", params, (err, result) => {
//         if(err){
//             console.log(err);
//         }
//     });
// }

Environments.delete = function(params){
    Meteor.call("deleteEnvironment", params, (err, result) => {
        if(err){
            console.log(err);
        }
    });
}


// let EnvironmentSchema = new SimpleSchema({
//
// });

// Environments.size = function(){
//     return Environments.find({}).count();
// }
//
// Environments.getVmEnvironments = function(){
//     return Environments.find({CONFIGURATION_TYPE_ID: 1});
// }
//
// Environments.getHubEnvironments = function(){
//     return Environments.find({CONFIGURATION_TYPE_ID: 2});
// }
//
// Environments.getEnvironmentsByType = function(type){
//     return Environments.find({CONFIGURATION_TYPE_ID: type});
// }
//
// Environments.getFromServer = function (){
//     Environments.isLoaded.set(false);
//     Environments.isLoading.set(true);
//
//     Meteor.call('getEnvironments', function(err, result) {
//         Environments.remove({});
//         if(!err){
//             _.each(result.data, function(row){
//                 Environments.insert(row);
//             });
//         } else {
//             console.log(err);
//         }
//     });
//     Environments.isLoaded.set(true);
//     Environments.isLoading.set(false);
// }
//
// Environments.setDefaultEnvironment = function(){
//     if(Session.get(SELECTED_ENVIRONMENT) === ''){
//         Meteor.call("getDefaultEnvironment", (err, result) => {
//             if(err){
//                 console.log(err);
//             }
//             else {
//                 Session.set(SELECTED_ENVIRONMENT, result);
//             }
//         });
//     }
// }

// Environments.updateHubOrVm = function(env){
//     Environments.isLoaded.set(false);
//     Environments.isLoading.set(true);
//
//     Meteor.call("updateEnvironment", env, (err, result) => {
//         if(err){
//             console.log(err);
//         }
//         else {
//             console.log(result.code);
//             //users.update({_id : "Jack"},{$set:{age : 13, username : "Jack"}});
//             // Environments.update({ENVIRONMENT_ID: env.ENVIRONMENT_ID}, {$set:{ENVIRONMENT_NME: env.ENVIRONMENT_NME,
//             //     ENVIRONMENT_DESCR: env.ENVIRONMENT_DESCR, URL: env.URL, ADMIN_PAGE_URL: env.ADMIN_PAGE_URL}});
//         }
//     });
//     Environments.isLoaded.set(true);
//     Environments.isLoading.set(false);
// }
//
// Environments.updateUberHubEnvironment = function(uberEnv){
//     Environments.isLoaded.set(false);
//     Environments.isLoading.set(true);
//
//     Meteor.call("updateUberHubEnvironment", uberEnv, (err, result) => {
//         if(err){
//             callback(err, false);
//         }
//         else {
//             Environments.update({ENVIRONMENT_ID: uberEnv.ENVIRONMENT_ID}, {$set:{ENVIRONMENT_NME: uberEnv.ENVIRONMENT_NME,
//                 ENVIRONMENT_DESCR: uberEnv.ENVIRONMENT_DESCR, URL: uberEnv.URL, ADMIN_PAGE_URL: uberEnv.ADMIN_PAGE_URL}});
//
//             Configurations.update({CONFIGURATION_ID: uberEnv.CONFIGURATION_ID},{$set:{DATABASE_SERVER: uberEnv.DATABASE_SERVER,
//                 DATABSE: uberEnv.DATABSE, USERNAME: uberEnv.USERNAME, PASSWD: uberEnv.PASSWD, DATASOURCE: uberEnv.DATASOURCE,
//                 PERF_HOURS: uberEnv.PERF_HOURS, CONFIG_TYPE: uberEnv.CONFIG_TYPE}});
//         }
//     });
//     Environments.isLoaded.set(true);
//     Environments.isLoading.set(false);
// }
//
// Environments.createEnvironment = function (environment, type, cb) {
//     Environments.isLoading.set(true);
//     Environments.isLoaded.set(false);
//     let method = "createVMVEnvironment";
//     if(type === 2){
//         method = "createHubEnvironment";
//     }
//     Meteor.call(method, environment, function (err, result) {
//
//         if(!err){
//             Environments.insert(result);
//             // _.each(result, function (row) {
//             //     Environments.insert(row);
//             // });
//             cb(null, true);
//         }
//         else {
//             console.log(err);
//             cb(err, null);
//         }
//         Environments.isLoaded.set(true);
//         Environments.isLoading.set(false);
//     });
// }
//
// Environments.createUberHubEnvironment = function (environment, type, cb) {
//     Environments.isLoading.set(true);
//     Environments.isLoaded.set(false);
//     Meteor.call("createUberHubEnvironment", environment, function (err, result) {
//
//         if(!err){
//             Environments.insert(result);
//             // _.each(result, function (row) {
//             //     Environments.insert(row);
//             // });
//             cb(null, true);
//         }
//         else {
//             console.log(err);
//             cb(err, null);
//         }
//         Environments.isLoaded.set(true);
//         Environments.isLoading.set(false);
//     });
// }
//
// Environments.deleteEnvironment = function (id) {
//     Environments.isLoaded.set(false);
//     Environments.isLoading.set(true);
//     console.log("Delete by id: " + id);
//     Meteor.call('deleteEnvironment', id, function (err, result) {
//         //TODO: Revist! Probably shouldnt be deleting from the Client
//         //console.log("Return code: " + result.code);
//         if(!err){
//             Environments.remove({ENVIRONMENT_ID: id});
//         } else {
//             console.log(err);
//         }
//     });
//     Environments.isLoaded.set(true);
//     Environments.isLoading.set(false);
// }
