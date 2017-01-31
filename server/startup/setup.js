/**
 * Created by adm9360 on 11/11/2016.
 */

//From Cam
// Meteor.startup(() => {
//     Accounts.callLoginMethod({
//         methodArguments: [{type: 'adfs', id: Injected.meta('adfs-auth')}],
//         userCallback(error, result) {
//
//         }
//     })
// });

// Do the below when the user logins, then use standard roles from there.
// This snippet belongs in its own file on the server.
// Accounts.onLogin(function(options) {
//     let roles = [];
//
//     if(options.user.services.adfs.role === 'paymentsadmin') {
//         roles.push('create-channel');
//         roles.push('manage-channel');
//     }
//
//     Roles.setUserRoles(options.user._id, roles);
// });

//if(!Roles.userIsInRole(Meteor.user(), 'manage-channel'))

Meteor.startup(function(){

    ////////////////////////////////////////////////////////////////////
    // Create Default Users
    //
    if (Meteor.users.find().fetch().length === 0) {

        console.log('Creating users: ');

        //Meteor requires the user must have a username field.
        var users = [
            // {firstName: "Normal", lastName: "User", username: "adm0001", password: "12345678", email:"normal@example.com", roles: ApplicationRoles.Analyst, group: ApplicationFunctions.Analyst, userEnv: UserEnvironments.dtl},
            // {firstName: "Installer", lastName: "User", username: "adm0002", password: "12345678", email:"installer@example.com", roles: ApplicationRoles.Installer, group: ApplicationFunctions.Installer, userEnv: UserEnvironments.dtl},
            // {firstName: "Operator", lastName: "User", username: "adm0003", password: "12345678", email:"operator@example.com", roles: ApplicationRoles.Operator, group: ApplicationFunctions.Operator, userEnv: UserEnvironments.dtl},
            // {firstName: "Admin", lastName: "User", username: "adm0004", password: "12345678", email:"admin@example.com", roles: ApplicationRoles.SuperUser, group: ApplicationFunctions.SuperUser, userEnv: UserEnvironments.dtl},
            {firstName: "James", lastName: "Brown", username: "adm1112", password: "12345678", email:"User1@hotmail.com", roles: ApplicationRoles.Analyst, group: ApplicationFunctions.Analyst, userEnv: UserEnvironments.dev},
            {firstName: "James", lastName: "Henry", username: "adm1122", password: "12345678", email:"aUser2@hotmail.com", roles: ApplicationRoles.Installer, group: ApplicationFunctions.Installer, userEnv: UserEnvironments.dtl},
            {firstName: "Joe", lastName: "Brown", username: "adm1133", password: "12345678", email:"User3@hotmail.com", roles: ApplicationRoles.Operator, group: ApplicationFunctions.Operator, userEnv: UserEnvironments.dtl},
            {firstName: "Fred", lastName: "Flintstone", username: "adm1144", password: "12345678", email:"User4@hotmail.com", roles: ApplicationRoles.SuperUser, group: ApplicationFunctions.SuperUser, userEnv: UserEnvironments.dtl},
            {firstName: "Barney", lastName: "Rubble", username: "adm1155", password: "12345678", email:"User5@hotmail.com", roles: ApplicationRoles.Analyst, group: ApplicationFunctions.Analyst, userEnv: UserEnvironments.dev},
            {firstName: "Stevie", lastName: "Wonder", username: "adm1166", password: "12345678", email:"User6@hotmail.com", roles: ApplicationRoles.Installer, group: ApplicationFunctions.Installer, userEnv: UserEnvironments.dtl},
            {firstName: "LL", lastName: "Kool J", username: "adm1177", password: "12345678", email:"User7@hotmail.com", roles: ApplicationRoles.Operator, group: ApplicationFunctions.Operator, userEnv: UserEnvironments.dtl},
            {firstName: "Harry", lastName: "Potter", username: "adm1188", password: "12345678", email:"User8@hotmail.com", roles: ApplicationRoles.SuperUser, group: ApplicationFunctions.SuperUser, userEnv: UserEnvironments.dtl},
            {firstName: "Elizabeth", lastName: "Turner", username: "adm1199", password: "12345678", email:"User9@hotmail.com", roles: ApplicationRoles.Analyst, group: ApplicationFunctions.Analyst, userEnv: UserEnvironments.dtl},
            {firstName: "Mario", lastName: "Wally", username: "adm1100", password: "12345678", email:"User10@hotmail.com", roles: ApplicationRoles.Installer, group: ApplicationFunctions.Installer, userEnv: UserEnvironments.dtl},
            {firstName: "Kate", lastName: "Oslow", username: "adm0011", password: "12345678", email:"User11@hotmail.com", roles: ApplicationRoles.Operator, group: ApplicationFunctions.Operator, userEnv: UserEnvironments.dtl},
            {firstName: "Wheres", lastName: "Wally", username: "adm0012", password: "12345678", email:"User12@hotmail.com", roles: ApplicationRoles.SuperUser, group: ApplicationFunctions.SuperUser, userEnv: UserEnvironments.prod}

        ];

        _.each(users, function (userData) {
            var id;

            console.log(userData);

            id = Accounts.createUser({
                username: userData.username,
                password: userData.password,
                email: userData.email
            });

            const userProfile = {
                firstName: userData.firstName,
                lastName: userData.lastName,
                userEnv: userData.userEnv,
                userGroup: (userData.group === "__global_roles__") ? "SuperUser": userData.group
            }

            // name verification
            Meteor.users.update({_id: id}, {$set:{'name.0.verified': true}});
            Meteor.users.update({_id: id}, {$set:{userProfile: userProfile}});
            Roles.addUsersToRoles(id, userData.roles, userData.group);

        });
        let id = Meteor.users.find({"userProfile.lastName": {"$eq": 'Brown'}});
        if(id){
            Meteor.users.update({_id:id}, {$set:{'userProfile.userGroup': "SuperUser"}});
            Roles.addUsersToRoles(id, ApplicationRoles.SuperUser, ApplicationFunctions.SuperUser);
        }
        id = Meteor.users.find({"userProfile.firstName": {"$eq": "Wheres"}});
        if(id){
            console.log(id);
            Meteor.users.update({_id:id}, {$set:{'userProfile.userGroup': "SuperUser"}});
            Roles.addUsersToRoles(id, ApplicationRoles.Analyst, ApplicationFunctions.Analyst);
        }
        id = Meteor.users.find({"userProfile.lastName": {"$eq": 'Rubble'}});
        if(id){
            Meteor.users.update({_id:id}, {$set:{'userProfile.userGroup': "SuperUser"}});
            Roles.addUsersToRoles(id, ApplicationRoles.SuperUser, ApplicationFunctions.SuperUser);
        }
    }

});