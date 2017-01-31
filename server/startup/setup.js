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
            {firstName: "Normal", lastName: "User", username: "adm0001", password: "12345678", email:"normal@example.com", roles: ApplicationRoles.Analyst, group: "Analyst"},
            {firstName: "Installer", lastName: "User", username: "adm0002", password: "12345678", email:"installer@example.com", roles: ApplicationRoles.Installer, group: "Installer"},
            {firstName: "Operator", lastName: "User", username: "adm0003", password: "12345678", email:"operator@example.com", roles: ApplicationRoles.Operator, group: "Operator"},
            {firstName: "Admin", lastName: "User", username: "adm0004", password: "12345678", email:"admin@example.com", roles: ApplicationRoles.SuperUser, group: Roles.GLOBAL_GROUP},
            {firstName: "James", lastName: "Brown", username: "adm1112", password: "12345678", email:"User1@hotmail.com", roles: ApplicationRoles.Analyst, group: "Analyst"},
            {firstName: "James", lastName: "Henry", username: "adm1122", password: "12345678", email:"aUser2@hotmail.com", roles: ApplicationRoles.Installer, group: "Installer"},
            {firstName: "Joe", lastName: "Brown", username: "adm1133", password: "12345678", email:"User3@hotmail.com", roles: ApplicationRoles.Operator, group: "Operator"},
            {firstName: "Fred", lastName: "Flintstone", username: "adm1144", password: "12345678", email:"User4@hotmail.com", roles: ApplicationRoles.SuperUser, group: Roles.GLOBAL_GROUP},
            {firstName: "Barney", lastName: "Rubble", username: "adm1155", password: "12345678", email:"User5@hotmail.com", roles: ApplicationRoles.Analyst, group: "Analyst"},
            {firstName: "Stevie", lastName: "Wonder", username: "adm1166", password: "12345678", email:"User6@hotmail.com", roles: ApplicationRoles.Installer, group: "Installer"},
            {firstName: "LL", lastName: "Kool J", username: "adm1177", password: "12345678", email:"User7@hotmail.com", roles: ApplicationRoles.Operator, group: "Operator"},
            {firstName: "Harry", lastName: "Potter", username: "adm1188", password: "12345678", email:"User8@hotmail.com", roles: ApplicationRoles.SuperUser, group: Roles.GLOBAL_GROUP},
            {firstName: "Elizabeth", lastName: "Turner", username: "adm1199", password: "12345678", email:"User9@hotmail.com", roles: ApplicationRoles.Analyst, group: "Analyst"},
            {firstName: "Mario", lastName: "Wally", username: "adm1100", password: "12345678", email:"User10@hotmail.com", roles: ApplicationRoles.Installer, group: "Installer"},
            {firstName: "Kate", lastName: "Oslow", username: "adm0011", password: "12345678", email:"User11@hotmail.com", roles: ApplicationRoles.Operator, group: "Operator"},
            {firstName: "Wheres", lastName: "Wally", username: "adm0012", password: "12345678", email:"User12@hotmail.com", roles: ApplicationRoles.SuperUser, group: Roles.GLOBAL_GROUP}


            //Roles.addUsersToRoles(joesUserId, 'super-admin', Roles.GLOBAL_GROUP)
        ];

        _.each(users, function (userData) {
            var id,
                user;

            console.log(userData);

            id = Accounts.createUser({
                username: userData.username,
                password: userData.password,
                profile: {
                    firstName: userData.firstName,
                    lastName: userData.lastName
                },
                email: userData.email
            });

            // name verification
            Meteor.users.update({_id: id}, {$set:{'name.0.verified': true}});
            // Accounts.onCreateUser((options, user) => {
            //
            // });
            Roles.addUsersToRoles(id, userData.roles, userData.group);

        });
    }

});