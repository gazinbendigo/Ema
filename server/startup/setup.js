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

        //TODO: Add email:"admin@example.com"
        var users = [
            {name: "Normal User", username: "adm9360", password: "user1", email:"normal@example.com", roles: [], group: "Analyst"},
            {name: "Installer User", username: "adm9360", password: "user2", email:"installer@example.com", roles: ['manage-apps', 'manage-versions', 'manage-routing', 'manage-roles'], group: "Installer"},
            {name: "Operator User", username: "adm9360", password: "user3", email:"operator@example.com", roles: ['manage-apps', 'manage-versions', 'manage-routing', 'manage-roles'], group: "Operator"},
            {name: "Admin User", username: "adm9360", password: "user4", email:"admin@example.com", roles: ['admin', 'super-user'], group: Roles.GLOBAL_GROUP}


            //Roles.addUsersToRoles(joesUserId, 'super-admin', Roles.GLOBAL_GROUP)
        ];

        _.each(users, function (userData) {
            var id,
                user;

            console.log(userData);

            id = Accounts.createUser({
                username: userData.username,
                password: userData.password,
                profile: { name: userData.name }
            });

            // name verification
            Meteor.users.update({_id: id}, {$set:{'name.0.verified': true}});

            Roles.addUsersToRoles(id, userData.roles);

        });
    }

});