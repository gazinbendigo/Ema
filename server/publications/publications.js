/**
 * Created by adm9360 on 10/12/2015.
 */


// Meteor.publish('ServicePerformanceStats', function(requestId){
//     if(requestId){
//         return ServicePerformanceStats.find({'requestId': requestId});
//     }
//     else {
//         return ServicePerformanceStats.find({});
//     }
// });

// Meteor.publish("manageConsumerProperties", function(){
//     return ConsumerProperties.find({});
// });
//
// Meteor.publish("consumers", function(){
//     return HubConsumers.find({});
// });

// Meteor.publish("environmentTypes", function () {
//     return EnvironmentTypes.find({});
// });

// Meteor.publish("environments", function () {
//     return Environments.find({});
// });

// Meteor.publish("configurations", function () {
//     return Configurations.find({});
// });

// Meteor.publish("hublogs", function(){
//     return HubLogs.find({});
// });

// Meteor.publish("applications", function(){
//     return Applications.find({});
// });

Meteor.publish("Users", function(){
    return Users.find({});
});

Meteor.publish("ApplicationRoles", function(){
    return ApplicationRoles.find({});
});

Meteor.publish(("UserRoles"), function(){
    return UserRoles.find({});
});
