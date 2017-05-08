/**
 * Created by adm9360_a on 17/03/2017.
 */


Meteor.startup(function() {

    UserTypesList.remove({});
    if (UserTypesList.find().count() === 0) {
        // UserTypesList.insert({USER_TYPE: UserTypes.Developer.name});
        // UserTypesList.insert({USER_TYPE: UserTypes.Domain.name});
        // UserTypesList.insert({USER_TYPE: UserTypes.SystemUser.name});
    }

    ApplicationRoles.remove({});
    if(ApplicationRoles.find({}).count() === 0){
        ApplicationRoles.insert({name: ApplicationFunctions.manageVersions, description: "Manage Versions"});
        ApplicationRoles.insert({name: ApplicationFunctions.manageUsers, description: "Manage Users"});
        ApplicationRoles.insert({name: ApplicationFunctions.manageRouting, description: "Manage Routing"});
        ApplicationRoles.insert({name: ApplicationFunctions.manageProps, description: "Manage Properties"});
        ApplicationRoles.insert({name: ApplicationFunctions.manageApps, description: "Manage Applications"});
        ApplicationRoles.insert({name: ApplicationFunctions.superUser, description: "Administrator"});
    }


});