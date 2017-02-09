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
            // {firstName: "James", lastName: "Brown", username: "adm1112", password: "12345678", email:"User1@hotmail.com",     roles: ApplicationRoles.properties[ApplicationRoles.Installer].roles, groups: ApplicationRoles.properties[ApplicationRoles.Installer].group, userEnv: EnvironmentGroups.DTL},
            // {firstName: "James", lastName: "Henry", username: "adm1122", password: "12345678", email:"aUser2@hotmail.com",    roles: ApplicationRoles.properties[ApplicationRoles.Installer].roles, groups: ApplicationRoles.properties[ApplicationRoles.Installer].group, userEnv: EnvironmentGroups.DTL},
            // {firstName: "Joe", lastName: "Brown", username: "adm1133", password: "12345678", email:"User3@hotmail.com",       roles: ApplicationRoles.properties[ApplicationRoles.Analyst].roles,   groups:ApplicationRoles.properties[ApplicationRoles.Analyst].group, userEnv: EnvironmentGroups.DEV},
            // {firstName: "Fred", lastName: "Flintstone", username: "adm1144", password: "12345678", email:"User4@hotmail.com", roles: ApplicationRoles.properties[ApplicationRoles.Analyst].roles,   groups:ApplicationRoles.properties[ApplicationRoles.Analyst].group, userEnv: EnvironmentGroups.DTL},
            // {firstName: "Barney", lastName: "Rubble", username: "adm1155", password: "12345678", email:"User5@hotmail.com",   roles: ApplicationRoles.properties[ApplicationRoles.Installer].roles, groups: ApplicationRoles.properties[ApplicationRoles.Installer].group,userEnv: EnvironmentGroups.DTL},
            // {firstName: "Stevie", lastName: "Wonder", username: "adm1166", password: "12345678", email:"User6@hotmail.com",   roles: ApplicationRoles.properties[ApplicationRoles.Analyst].roles,   groups:ApplicationRoles.properties[ApplicationRoles.Analyst].group, userEnv: EnvironmentGroups.DEV},
            // {firstName: "LL", lastName: "Kool J", username: "adm1177", password: "12345678", email:"User7@hotmail.com",       roles: ApplicationRoles.properties[ApplicationRoles.Administrator].roles, groups: ApplicationRoles.properties[ApplicationRoles.Administrator].group, userEnv: EnvironmentGroups.DTL},
            // {firstName: "Harry", lastName: "Potter", username: "adm1188", password: "12345678", email:"User8@hotmail.com",    roles: ApplicationRoles.properties[ApplicationRoles.SuperUser].roles, groups: ApplicationRoles.properties[ApplicationRoles.SuperUser].group, userEnv: EnvironmentGroups.DTL},
            // {firstName: "Elizabeth", lastName: "Turner", username: "adm1199", password: "12345678", email:"User9@hotmail.com",roles: ApplicationRoles.properties[ApplicationRoles.Installer].roles, groups: ApplicationRoles.properties[ApplicationRoles.Installer].group, userEnv: EnvironmentGroups.DTL},
            // {firstName: "Mario", lastName: "Wally", username: "adm1100", password: "12345678", email:"User10@hotmail.com",    roles: ApplicationRoles.properties[ApplicationRoles.Analyst].roles,   groups:ApplicationRoles.properties[ApplicationRoles.Analyst].group, userEnv: EnvironmentGroups.DEV},
            // {firstName: "Kate", lastName: "Oslow", username: "adm0011", password: "12345678", email:"User11@hotmail.com",     roles: ApplicationRoles.properties[ApplicationRoles.Administrator].roles, groups: ApplicationRoles.properties[ApplicationRoles.Administrator].group, userEnv: EnvironmentGroups.DTL},
            // {firstName: "Wheres", lastName: "Wally", username: "adm0012", password: "12345678", email:"User12@hotmail.com",   roles: ApplicationRoles.properties[ApplicationRoles.SuperUser].roles, groups: ApplicationRoles.properties[ApplicationRoles.SuperUser].group, userEnv: EnvironmentGroups.DTL}

            {firstName: "James", lastName: "Brown", username: "adm1112", password: "12345678", email:"User1@hotmail.com",     groups: {DTL: [ApplicationRoles.properties[ApplicationRoles.Installer].group, ApplicationRoles.properties[ApplicationRoles.Administrator].group], DEV: []}},
            {firstName: "James", lastName: "Henry", username: "adm1122", password: "12345678", email:"aUser2@hotmail.com",    groups: {DTL: [ApplicationRoles.properties[ApplicationRoles.Installer].group], DEV: []}},
            {firstName: "Joe", lastName: "Brown", username: "adm1133", password: "12345678", email:"User3@hotmail.com",       groups: {DTL: [ApplicationRoles.properties[ApplicationRoles.Analyst].group], DEV: [ApplicationRoles.properties[ApplicationRoles.SuperUser].group]}},
            {firstName: "Fred", lastName: "Flintstone", username: "adm1144", password: "12345678", email:"User4@hotmail.com", groups: {DTL: [ApplicationRoles.properties[ApplicationRoles.Analyst].group], DEV: [ApplicationRoles.properties[ApplicationRoles.SuperUser].group, ApplicationRoles.properties[ApplicationRoles.Administrator].group]}},
            {firstName: "Barney", lastName: "Rubble", username: "adm1155", password: "12345678", email:"User5@hotmail.com",   groups: {DTL: [ApplicationRoles.properties[ApplicationRoles.Installer].group], DEV: []}},
            {firstName: "Stevie", lastName: "Wonder", username: "adm1166", password: "12345678", email:"User6@hotmail.com",   groups: {DTL: [ApplicationRoles.properties[ApplicationRoles.Analyst].group], DEV: [ApplicationRoles.properties[ApplicationRoles.SuperUser].group]}},
            {firstName: "LL", lastName: "Kool J", username: "adm1177", password: "12345678", email:"User7@hotmail.com",       groups: {DTL: [ApplicationRoles.properties[ApplicationRoles.Administrator].group, ApplicationRoles.properties[ApplicationRoles.Installer].group], DEV: []}},
            {firstName: "Harry", lastName: "Potter", username: "adm1188", password: "12345678", email:"User8@hotmail.com",    groups: {DTL: [ApplicationRoles.properties[ApplicationRoles.SuperUser].group], DEV: []}},
            {firstName: "Elizabeth", lastName: "Turner", username: "adm1199", password: "12345678", email:"User9@hotmail.com",groups: {DTL: [ApplicationRoles.properties[ApplicationRoles.Installer].group], DEV: []}},
            {firstName: "Mario", lastName: "Wally", username: "adm1100", password: "12345678", email:"User10@hotmail.com",    groups: {DTL: [ApplicationRoles.properties[ApplicationRoles.Analyst].group], DEV: [ApplicationRoles.properties[ApplicationRoles.SuperUser].group]}},
            {firstName: "Kate", lastName: "Oslow", username: "adm0011", password: "12345678", email:"User11@hotmail.com",     groups: {DTL: [ApplicationRoles.properties[ApplicationRoles.Administrator].group], DEV: []}},
            {firstName: "Wheres", lastName: "Wally", username: "adm0012", password: "12345678", email:"User12@hotmail.com",   groups: {DTL: [ApplicationRoles.properties[ApplicationRoles.SuperUser].group], DEV: []}}

        ];

        //firstName: "James", lastName: "Brown", username: "adm1112", password: "12345678", email:"User1@hotmail.com", roles: [], group: agroup
        _.each(users, function (userData) {
            var id;

            id = Accounts.createUser({
                username: userData.username,
                password: userData.password,
                emails: userData.email
            });

            const userProfile = {
                firstName: userData.firstName,
                lastName: userData.lastName
            }

            // name verification
            Meteor.users.update({_id: id}, {$set:{'name.0.verified': true}});
            Meteor.users.update({_id: id}, {$set:{userProfile: userProfile}});

            _.each(userData.groups.DTL, function(group){
                Roles.addUsersToRoles(id, ApplicationRoles.getApplicationRolesByGroup(group));
            });

            _.each(userData.groups.DEV, function (group) {
                Roles.addUsersToRoles(id, ApplicationRoles.getApplicationRolesByGroup(group));
            });

        });
        console.log("Accounts created.");
    }

});

