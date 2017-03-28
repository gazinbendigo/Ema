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
//     let roles = [userRoles.ana];
//
//     if(options.user.services.adfs.role === 'paymentsuserRoles.admin') {
//         roles.push('create-channel');
//         roles.push('muserRoles.anage-channel');
//     }
//
//     Roles.setUserRoles(options.user._id, roles);
// });

//if(!Roles.userIsInRole(Meteor.user(), 'muserRoles.anage-channel'))

(function(){
    "use strict";

    Meteor.startup(function(){

        ////////////////////////////////////////////////////////////////////
        // Create Default Users
        //
        if (Meteor.users.find().fetch().length === 0) {
            const userRoles = {inst: 'Installer', admin: 'Administrator', ana: 'Analyst', supu: 'SuperUser'};

            console.log('Creating users: ');
            //Meteor requires the user must have a username field.
            var users = [
                {firstName: "James", lastName: "Brown", username: "adm1112", password: "12345678", email:"User1@hotmail.com", isDeveloper: false,     groups: {OTHER: [userRoles.inst, userRoles.admin], DEV:[userRoles.ana]}},
                {firstName: "James", lastName: "Henry", username: "adm1143", password: "12345678", email:"aUser2@hotmail.com", isDeveloper: false,    groups: {OTHER: [userRoles.inst], DEV: [userRoles.ana]}},
                {firstName: "Joe", lastName: "Brown", username: "adm1144", password: "12345678", email:"User3@hotmail.com", isDeveloper: true,       groups: {OTHER: [userRoles.ana], DEV: [userRoles.supu]}},
                {firstName: "Fred", lastName: "Flintstone", username: "adm1145", password: "12345678", email:"User4@hotmail.com", isDeveloper: true, groups: {OTHER: [userRoles.ana], DEV: [userRoles.supu]}},
                {firstName: "Barney", lastName: "Rubble", username: "adm1155", password: "12345678", email:"User5@hotmail.com", isDeveloper: true,   groups: {OTHER: [userRoles.inst], DEV: [userRoles.ana, userRoles.admin]}},
                {firstName: "Stevie", lastName: "Wonder", username: "adm1166", password: "12345678", email:"User6@hotmail.com", isDeveloper: true,   groups: {OTHER: [userRoles.ana], DEV: [userRoles.supu]}},
                {firstName: "LL", lastName: "Kool J", username: "adm1177", password: "12345678", email:"User7@hotmail.com", isDeveloper: false,       groups: {OTHER: [userRoles.admin, userRoles.inst], DEV: [userRoles.ana]}},
                {firstName: "Harry", lastName: "Potter", username: "adm1188", password: "12345678", email:"User8@hotmail.com", isDeveloper: false,    groups: {OTHER: [userRoles.supu], DEV: [userRoles.ana]}},
                {firstName: "Elizabeth", lastName: "Turner", username: "adm1199", password: "12345678", email:"User9@hotmail.com",isDeveloper: false, groups: {OTHER: [userRoles.inst], DEV: [userRoles.ana]}},
                {firstName: "Mario", lastName: "Wally", username: "adm1100", password: "12345678", email:"User10@hotmail.com", isDeveloper: true,    groups: {OTHER: [userRoles.ana], DEV: [userRoles.supu]}},
                {firstName: "Kate", lastName: "Oslow", username: "adm0011", password: "12345678", email:"User11@hotmail.com",  isDeveloper: false,  groups: {OTHER: [userRoles.admin], DEV: [userRoles.ana]}},
                {firstName: "Wheres", lastName: "Wally", username: "adm0012", password: "12345678", email:"User12@hotmail.com", isDeveloper: false, groups: {OTHER: [userRoles.supu], DEV: [userRoles.ana]}},
                {firstName: "Allen", lastName: "Travis", username: "adm1113", password: "12345678", email:"User13@hotmail.com", isDeveloper: false,   groups: {OTHER: [userRoles.inst, userRoles.admin], DEV: [userRoles.ana]}},
                {firstName: "Callum", lastName: "Fry", username: "adm1114", password: "12345678", email:"aUser14@hotmail.com", isDeveloper: false,    groups: {OTHER: [userRoles.inst], DEV: [userRoles.ana]}},
                {firstName: "Jeremiah", lastName: "Baxter", username: "adm1115", password: "12345678", email:"User15@hotmail.com",isDeveloper: true, groups: {OTHER: [userRoles.ana], DEV: [userRoles.supu]}},
                {firstName: "Londyn", lastName: "Bridges", username: "adm1116", password: "12345678", email:"User16@hotmail.com", isDeveloper: true, groups: {OTHER: [userRoles.ana], DEV: [userRoles.supu, userRoles.admin]}},
                {firstName: "Amelie", lastName: "Baker", username: "adm1117", password: "12345678", email:"User17@hotmail.com", isDeveloper: false,   groups: {OTHER: [userRoles.inst], DEV: [userRoles.ana]}},
                {firstName: "Ally", lastName: "Harding", username: "adm1118", password: "12345678", email:"User18@hotmail.com", isDeveloper: true,   groups: {OTHER: [userRoles.ana], DEV: [userRoles.supu]}},
                {firstName: "Nathen", lastName: "Conway", username: "adm1119", password: "12345678", email:"User19@hotmail.com", isDeveloper: false, groups: {OTHER: [userRoles.admin, userRoles.inst], DEV: [userRoles.ana]}},
                {firstName: "Isabel", lastName: "Chapman", username: "adm1120", password: "12345678", email:"User20@hotmail.com", isDeveloper: false, groups: {OTHER: [userRoles.supu], DEV: [userRoles.ana]}},
                {firstName: "Clarissa", lastName: "Zamora", username: "adm1121", password: "12345678", email:"User21@hotmail.com",isDeveloper: false, groups: {OTHER: [userRoles.inst], DEV: [userRoles.ana]}},
                {firstName: "Cali", lastName: "Townsend", username: "adm1122", password: "12345678", email:"User22@hotmail.com", isDeveloper: true,  groups: {OTHER: [userRoles.ana], DEV: [userRoles.supu]}},
                {firstName: "Julianna", lastName: "Mcmahon", username: "adm1123", password: "12345678", email:"User23@hotmail.com",isDeveloper: false,groups: {OTHER: [userRoles.admin], DEV: [userRoles.ana]}},
                {firstName: "Byron", lastName: "Guerra", username: "adm1124", password: "12345678", email:"User24@hotmail.com", isDeveloper: false, groups: {OTHER: [userRoles.supu], DEV: [userRoles.ana]}},
                {firstName: "Ali", lastName: "Gilmore", username: "adm1125", password: "12345678", email:"User25@hotmail.com",  isDeveloper: false, groups: {OTHER: [userRoles.inst, userRoles.admin], DEV: [userRoles.ana]}},
                {firstName: "Natalee", lastName: "Garza", username: "adm1126", password: "12345678", email:"aUser26@hotmail.com",isDeveloper: false,  groups: {OTHER: [userRoles.inst], DEV: [userRoles.ana]}},
                {firstName: "Heath", lastName: "Boone", username: "adm1127", password: "12345678", email:"User27@hotmail.com", isDeveloper: true,    groups: {OTHER: [userRoles.ana], DEV: [userRoles.supu]}},
                {firstName: "Zoie", lastName: "Sloan", username: "adm1128", password: "12345678", email:"User28@hotmail.com", isDeveloper: true,     groups: {OTHER: [userRoles.ana], DEV: [userRoles.supu, userRoles.admin]}},
                {firstName: "Jaqueline", lastName: "Villa", username: "adm1129", password: "12345678", email:"User29@hotmail.com",isDeveloper: false, groups: {OTHER: [userRoles.inst], DEV: [userRoles.ana]}},
                {firstName: "Madden", lastName: "Gill", username: "adm1130", password: "12345678", email:"User30@hotmail.com", isDeveloper: true,    groups: {OTHER: [userRoles.ana], DEV: [userRoles.supu]}},
                {firstName: "Cierra", lastName: "Boyd", username: "adm1131", password: "12345678", email:"User31@hotmail.com", isDeveloper: false,    groups: {OTHER: [userRoles.admin, userRoles.inst], DEV: [userRoles.ana]}},
                {firstName: "Drake", lastName: "Foster", username: "adm1132", password: "12345678", email:"User32@hotmail.com", isDeveloper: false,   groups: {OTHER: [userRoles.supu], DEV: [userRoles.ana]}},
                {firstName: "Dominique", lastName: "Bryant", username: "adm1133", password: "12345678", email:"User33@hotmail.com",isDeveloper: false,groups: {OTHER: [userRoles.inst], DEV: [userRoles.ana]}},
                {firstName: "Isaias", lastName: "Mcguire", username: "adm1134", password: "12345678", email:"User34@hotmail.com", isDeveloper: true, groups: {OTHER: [userRoles.ana], DEV: [userRoles.supu]}},
                {firstName: "Casey", lastName: "Hendricks", username: "adm1135", password: "12345678", email:"User35@hotmail.com",isDeveloper: false, groups: {OTHER: [userRoles.admin], DEV: [userRoles.ana]}},
                {firstName: "Jamison", lastName: "Kennedy", username: "adm1136", password: "12345678", email:"User36@hotmail.com",isDeveloper: false, groups: {OTHER: [userRoles.supu], DEV: [userRoles.ana]}},
                {firstName: "Cullen", lastName: "Duke", username: "adm1137", password: "12345678", email:"User37@hotmail.com", isDeveloper: false,  groups: {OTHER: [userRoles.inst, userRoles.admin], DEV: [userRoles.ana]}},
                {firstName: "Faith", lastName: "Jacobs", username: "adm1138", password: "12345678", email:"aUser38@hotmail.com", isDeveloper: false,  groups: {OTHER: [userRoles.inst], DEV: [userRoles.ana]}},
                {firstName: "Jessie", lastName: "West", username: "adm1139", password: "12345678", email:"User39@hotmail.com", isDeveloper: true,    groups: {OTHER: [userRoles.ana], DEV: [userRoles.supu]}},
                {firstName: "Simone", lastName: "Schmidt", username: "adm1140", password: "12345678", email:"User40@hotmail.com", isDeveloper: true, groups: {OTHER: [userRoles.ana], DEV: [userRoles.supu, userRoles.admin]}},
                {firstName: "Melissa", lastName: "Contreras", username: "adm1141", password: "12345678", email:"User41@hotmail.com",isDeveloper: false,groups: {OTHER: [userRoles.inst], DEV: [userRoles.ana]}},
                {firstName: "Andy", lastName: "Fleming", username: "adm1142", password: "12345678", email:"User42@hotmail.com", isDeveloper: true,    groups: {OTHER: [userRoles.ana], DEV: [userRoles.supu]}}

            ];

            _.each(users, (userData) => {
                let id;

                id = Accounts.createUser({
                    username: userData.username,
                    password: userData.password,
                    email: userData.email
                });

                const profile = {
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    isDeveloper: userData.isDeveloper
                }

                // name verification
                //Meteor.users.update({_id: id}, {$set:{'name.0.verified': true}});
                Meteor.users.update({_id: id}, {$set:{profile: profile}});

                Roles.addUsersToRoles(id, userData.groups.OTHER, 'OTHER');
                Roles.addUsersToRoles(id, userData.groups.DEV, 'DEV');

            });
            console.log("Accounts created.");
        }

    });

}());

