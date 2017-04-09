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
//         roles.push('muserRoles.manage-channel');
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

            const env = {test: 'TEST', dev: 'DEV', prod: 'PROD'};

            console.log('Creating users: ');
            //Meteor requires the user must have a username field.
            var users = [
                {firstName: "James", lastName: "Brown", username: "adm1112", password: "12345678", email:"User1@hotmail.com", PrimaryEnv: env.test,         UserRole: Role.Configurator},
                {firstName: "James", lastName: "Henry", username: "adm1143", password: "12345678", email:"aUser2@hotmail.com", PrimaryEnv: env.dev,         UserRole: Role.Developer},
                {firstName: "Joe",  lastName: "Brown", username: "adm1144", password: "12345678", email:"User3@hotmail.com", PrimaryEnv: env.dev,           UserRole: Role.Administrator},
                {firstName: "Prod", lastName: "Admin", username: "adm1146", password: "12345678", email:"Userp1@hotmail.com", PrimaryEnv: env.prod,         UserRole: Role.Analyst},

                {firstName: "Prod", lastName: "Installer", username: "adm1147", password: "12345678", email:"Userp2@hotmail.com", PrimaryEnv: env.prod,     UserRole: Role.Configurator},
                {firstName: "Fred", lastName: "Flintstone", username: "adm1145", password: "12345678", email:"User4@hotmail.com", PrimaryEnv: env.dev,      UserRole: Role.Developer},
                {firstName: "Barney", lastName: "Rubble", username: "adm1155", password: "12345678", email:"User5@hotmail.com", PrimaryEnv: env.dev,        UserRole: Role.Administrator},
                {firstName: "Stevie", lastName: "Wonder", username: "adm1166", password: "12345678", email:"User6@hotmail.com", PrimaryEnv: env.dev,        UserRole: Role.Analyst},
                {firstName: "LL",   lastName: "Kool J", username: "adm1177", password: "12345678", email:"User7@hotmail.com", PrimaryEnv: env.test,         UserRole: Role.Configurator},
                {firstName: "Harry", lastName: "Potter", username: "adm1188", password: "12345678", email:"User8@hotmail.com", PrimaryEnv: env.test,        UserRole: Role.Developer},
                {firstName: "Elizabeth", lastName: "Turner", username: "adm1199", password: "12345678", email:"User9@hotmail.com",PrimaryEnv: env.test,     UserRole: Role.Administrator},
                {firstName: "Mario", lastName: "Wally", username: "adm1100", password: "12345678", email:"User10@hotmail.com", PrimaryEnv: env.dev,         UserRole: Role.Analyst},
                {firstName: "Kate", lastName: "Oslow", username: "adm0011", password: "12345678", email:"User11@hotmail.com",  PrimaryEnv: env.test,        UserRole: Role.Configurator},
                {firstName: "Wheres", lastName: "Wally", username: "adm0012", password: "12345678", email:"User12@hotmail.com", PrimaryEnv: env.test,       UserRole: Role.Developer},
                {firstName: "Allen", lastName: "Travis", username: "adm1113", password: "12345678", email:"User13@hotmail.com", PrimaryEnv: env.test,       UserRole: Role.Administrator},
                {firstName: "Callum", lastName: "Fry", username: "adm1114", password: "12345678", email:"aUser14@hotmail.com", PrimaryEnv: env.test,        UserRole: Role.Analyst},
                {firstName: "Jeremiah", lastName: "Baxter", username: "adm1115", password: "12345678", email:"User15@hotmail.com",PrimaryEnv: env.dev,      UserRole: Role.Configurator},
                {firstName: "Londyn", lastName: "Bridges", username: "adm1116", password: "12345678", email:"User16@hotmail.com", PrimaryEnv: env.dev,      UserRole: Role.Developer},
                {firstName: "Amelie", lastName: "Baker", username: "adm1117", password: "12345678", email:"User17@hotmail.com", PrimaryEnv: env.test,       UserRole: Role.Administrator},
                {firstName: "Ally", lastName: "Harding", username: "adm1118", password: "12345678", email:"User18@hotmail.com", PrimaryEnv: env.dev,        UserRole: Role.Analyst},
                {firstName: "Nathen", lastName: "Conway", username: "adm1119", password: "12345678", email:"User19@hotmail.com", PrimaryEnv: env.test,      UserRole: Role.Configurator},
                {firstName: "Isabel", lastName: "Chapman", username: "adm1120", password: "12345678", email:"User20@hotmail.com", PrimaryEnv: env.test,     UserRole: Role.Developer},
                {firstName: "Clarissa", lastName: "Zamora", username: "adm1121", password: "12345678", email:"User21@hotmail.com",PrimaryEnv: env.test,     UserRole: Role.Administrator},
                {firstName: "Cali", lastName: "Townsend", username: "adm1122", password: "12345678", email:"User22@hotmail.com", PrimaryEnv: env.dev,       UserRole: Role.Analyst},
                {firstName: "Julianna", lastName: "Mcmahon", username: "adm1123", password: "12345678", email:"User23@hotmail.com",PrimaryEnv: env.test,    UserRole: Role.Configurator},
                {firstName: "Byron", lastName: "Guerra", username: "adm1124", password: "12345678", email:"User24@hotmail.com", PrimaryEnv: env.test,       UserRole: Role.Developer},
                {firstName: "Ali", lastName: "Gilmore", username: "adm1125", password: "12345678", email:"User25@hotmail.com",  PrimaryEnv: env.test,       UserRole: Role.Administrator},
                {firstName: "Natalee", lastName: "Garza", username: "adm1126", password: "12345678", email:"aUser26@hotmail.com",PrimaryEnv: env.test,      UserRole: Role.Analyst},
                {firstName: "Heath", lastName: "Boone", username: "adm1127", password: "12345678", email:"User27@hotmail.com", PrimaryEnv: env.dev,         UserRole: Role.Configurator},
                {firstName: "Zoie", lastName: "Sloan", username: "adm1128", password: "12345678", email:"User28@hotmail.com", PrimaryEnv: env.dev,          UserRole: Role.Developer},
                {firstName: "Jaqueline", lastName: "Villa", username: "adm1129", password: "12345678", email:"User29@hotmail.com",PrimaryEnv: env.test,     UserRole: Role.Administrator},
                {firstName: "Madden", lastName: "Gill", username: "adm1130", password: "12345678", email:"User30@hotmail.com", PrimaryEnv: env.dev,         UserRole: Role.Analyst},
                {firstName: "Cierra", lastName: "Boyd", username: "adm1131", password: "12345678", email:"User31@hotmail.com", PrimaryEnv: env.test,        UserRole: Role.Configurator},
                {firstName: "Drake", lastName: "Foster", username: "adm1132", password: "12345678", email:"User32@hotmail.com", PrimaryEnv: env.test,       UserRole: Role.Developer},
                {firstName: "Dominique", lastName: "Bryant", username: "adm1133", password: "12345678", email:"User33@hotmail.com",PrimaryEnv: env.test,    UserRole: Role.Administrator},
                {firstName: "Isaias", lastName: "Mcguire", username: "adm1134", password: "12345678", email:"User34@hotmail.com", PrimaryEnv: env.dev,      UserRole: Role.Analyst},
                {firstName: "Casey", lastName: "Hendricks", username: "adm1135", password: "12345678", email:"User35@hotmail.com",PrimaryEnv: env.test,     UserRole: Role.Configurator},
                {firstName: "Jamison", lastName: "Kennedy", username: "adm1136", password: "12345678", email:"User36@hotmail.com",PrimaryEnv: env.test,     UserRole: Role.Developer},
                {firstName: "Cullen", lastName: "Duke", username: "adm1137", password: "12345678", email:"User37@hotmail.com", PrimaryEnv: env.test,        UserRole: Role.Administrator},
                {firstName: "Faith", lastName: "Jacobs", username: "adm1138", password: "12345678", email:"aUser38@hotmail.com", PrimaryEnv: env.test,      UserRole: Role.Analyst},
                {firstName: "Jessie", lastName: "West", username: "adm1139", password: "12345678", email:"User39@hotmail.com", PrimaryEnv: env.dev,         UserRole: Role.Configurator},
                {firstName: "Simone", lastName: "Schmidt", username: "adm1140", password: "12345678", email:"User40@hotmail.com", PrimaryEnv: env.dev,      UserRole: Role.Developer},
                {firstName: "Melissa", lastName: "Contreras", username: "adm1141", password: "12345678", email:"User41@hotmail.com",PrimaryEnv: env.test,   UserRole: Role.Administrator},
                {firstName: "Andy", lastName: "Fleming", username: "adm1142", password: "12345678", email:"User42@hotmail.com", PrimaryEnv: env.dev,        UserRole: Role.Analyst}

            ];

            _.each(users, (userData) => {
                let id;

                id = Accounts.createUser({
                    username: userData.username,
                    password: userData.password,
                    email: userData.email,
                    isSuperUser: userData.isSuperUser
                });

                const identity = {
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    primaryEnv: userData.PrimaryEnv
                }

                Meteor.users.update({_id: id}, {$set:{identity: identity}});
                Roles.addUsersToRoles(id, Role.Developer, UserType.Developer);
                Roles.addUsersToRoles(id, Role.Configurator, UserType.Configurator);
                Roles.addUsersToRoles(id, Role.Administrator, UserType.Administrator);
                Roles.addUsersToRoles(id, Role.Analyst, UserType.Analyst);
            });

            //     // name verification
            //     //Meteor.users.update({_id: id}, {$set:{'name.0.verified': true}});

            //
            //     Roles.addUsersToRoles(id, userData.groups.TEST, 'TEST');
            //     Roles.addUsersToRoles(id, userData.groups.DEV, 'DEV');
            //     Roles.addUsersToRoles(id, userData.groups.PROD, 'PROD');
            //
            // });
            console.log("Accounts created.");
        }

    });

}());

