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
            {firstName: "James", lastName: "Brown", username: "adm1112", password: "12345678", email:"User1@hotmail.com", roles: ApplicationRoles.Analyst, group: ApplicationFunctions.Analyst, userEnv: UserEnvironments.dev},
            {firstName: "James", lastName: "Henry", username: "adm1122", password: "12345678", email:"aUser2@hotmail.com", roles: ApplicationRoles.Installer, group: ApplicationFunctions.Installer, userEnv: UserEnvironments.dtl},
            {firstName: "Joe", lastName: "Brown", username: "adm1133", password: "12345678", email:"User3@hotmail.com", roles: ApplicationRoles.Administrator, group: ApplicationFunctions.Administrator, userEnv: UserEnvironments.dtl},
            {firstName: "Fred", lastName: "Flintstone", username: "adm1144", password: "12345678", email:"User4@hotmail.com", roles: ApplicationRoles.SuperUser, group: ApplicationFunctions.SuperUser, userEnv: UserEnvironments.dtl},
            {firstName: "Barney", lastName: "Rubble", username: "adm1155", password: "12345678", email:"User5@hotmail.com", roles: ApplicationRoles.Analyst, group: ApplicationFunctions.Analyst, userEnv: UserEnvironments.dev},
            {firstName: "Stevie", lastName: "Wonder", username: "adm1166", password: "12345678", email:"User6@hotmail.com", roles: ApplicationRoles.Installer, group: ApplicationFunctions.Installer, userEnv: UserEnvironments.dtl},
            {firstName: "LL", lastName: "Kool J", username: "adm1177", password: "12345678", email:"User7@hotmail.com", roles: ApplicationRoles.Administrator, group: ApplicationFunctions.Administrator, userEnv: UserEnvironments.dtl},
            {firstName: "Harry", lastName: "Potter", username: "adm1188", password: "12345678", email:"User8@hotmail.com", roles: ApplicationRoles.SuperUser, group: ApplicationFunctions.SuperUser, userEnv: UserEnvironments.dtl},
            {firstName: "Elizabeth", lastName: "Turner", username: "adm1199", password: "12345678", email:"User9@hotmail.com", roles: ApplicationRoles.Analyst, group: ApplicationFunctions.Analyst, userEnv: UserEnvironments.dtl},
            {firstName: "Mario", lastName: "Wally", username: "adm1100", password: "12345678", email:"User10@hotmail.com", roles: ApplicationRoles.Installer, group: ApplicationFunctions.Installer, userEnv: UserEnvironments.dtl},
            {firstName: "Kate", lastName: "Oslow", username: "adm0011", password: "12345678", email:"User11@hotmail.com", roles: ApplicationRoles.Administrator, group: ApplicationFunctions.Administrator, userEnv: UserEnvironments.dtl},
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
                team: userData.userEnv,
                userGroup: (userData.group === "__global_roles__") ? "SuperUser": userData.group
            }

            // name verification
            Meteor.users.update({_id: id}, {$set:{'name.0.verified': true}});
            Meteor.users.update({_id: id}, {$set:{userProfile: userProfile}});
            Roles.addUsersToRoles(id, userData.roles, userData.group);

        });
        let id = findUserId('Brown', function(err, result){
            if(id){
                Meteor.users.update({_id:id}, {$set:{'userProfile.userGroup': "SuperUser"}});
                Roles.addUsersToRoles(id, ApplicationRoles.SuperUser, ApplicationFunctions.SuperUser);
            }
        });// Meteor.users.find({"userProfile.lastName": {"$eq": 'Brown'}});

        id = findUserId('Wheres', function(err, result) {
            if(id){
                console.log(id);
                Meteor.users.update({_id:id}, {$set:{'userProfile.userGroup': "SuperUser"}});
                Roles.addUsersToRoles(id, ApplicationRoles.Analyst, ApplicationFunctions.Analyst);
            }
        });//Meteor.users.find({"userProfile.firstName": {"$eq": "Wheres"}});

        id = findUserId('Rubble', function(err, result){
            if(id){
                // updateUser(id, 'userProfile.userGroup', "SuperUser", function(err, result){
                //
                // });
                Meteor.users.update({_id:id}, {$set:{'userProfile.userGroup': "SuperUser"}});
                Roles.addUsersToRoles(id, ApplicationRoles.SuperUser, ApplicationFunctions.SuperUser);
            }
        });//Meteor.users.find({"userProfile.lastName": {"$eq": 'Rubble'}});
    }

});

function findUserId(lastName, cb){
    let id = Meteor.users.find({"userProfile.lastName": {"$eq": lastName}});
    cb(null, id);
};

function updateUser(id, col, value, cb){
    Meteor.users.update({_id:id}, {$set:{col: value}});
}