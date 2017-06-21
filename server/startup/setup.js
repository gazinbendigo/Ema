/**
* Created by adm9360 on 11/11/2016.
*/

import { Meteor } from 'meteor/meteor';

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

Meteor.startup(function(){
    "use strict";

    ////////////////////////////////////////////////////////////////////
    // Create Default Groups
    //
    Groups.remove({});
    //if(Groups.find({}).count() === 0){
        Groups.insert({groupId: 1, groupName: "Developer", groupDesc: "ICC HUB Application Developer"});
        Groups.insert({groupId: 2, groupName: "Operator", groupDesc: "Non Development Environment user"});
        Groups.insert({groupId: 3, groupName: "Administrator", groupDesc: "Manages Users and there accounts"});
        Groups.insert({groupId: 4, groupName: "SuperUser", groupDesc: "Manages all application functions"});
        Groups.rawCollection().createIndex({groupId:1}, {unique: true});
        console.log(Groups.find({}).count());
    //}

    ////////////////////////////////////////////////////////////////////
    // Create Default Roles
    //
    EmaRoles.remove({});
    if(EmaRoles.find({}).count() === 0){
        EmaRoles.insert({roleId: 1, roleName: "Installer", roleDesc: "Installs applications"});
        EmaRoles.insert({roleId: 2, roleName: "Routing", roleDesc: "Routes Message Flows"});
        EmaRoles.insert({roleId: 3, roleName: "Versioning", roleDesc: "Manages Service versions"});
        EmaRoles.insert({roleId: 4, roleName: "UserManagement", roleDesc: "Manages Users and there accounts"});
        EmaRoles.rawCollection().createIndex({roleId:1}, {unique: true});
    }

    ////////////////////////////////////////////////////////////////////
    // Create Default Users
    //
    if (Meteor.users.find().fetch().length === 0) {

        //const env = {dom: 'TEST', dev: 'DEV', dom: 'PROD'};

        console.log('Creating users: ');
        let firstNames = ["James", "James","Joe","Emily","Kate","Fred","Barney","Stevie","LL","Harry","Elizabeth", "Mario","Kate",
            "Wheres","Allen","Callum","Jeremiah","Londyn","Amelie","Ally","Nathen","Isabel","Clarissa", "Cali", "Julianna","Byron",
            "Ali", "Natalee", "Heath","Zoie","Jaqueline", "Madden", "Cierra", "Drake", "Dominique", "Isaias", "Casey","Jamison","Cullen","Faith","Jessie","Simone","Melissa","Andy"];

        let lastNames = ["Brown", "Henry", "Brown", "Jones", "Lowe", "Flintstone", "Rubble","Wonder","Kool J","Potter",
            "Turner","Wally","Oslow","Wally","Travis","Fry","Baxter","Bridges","Baker","Harding","Conway","Chapman","Zamora",
            "Townsend","Mcmahon","Guerra","Gilmore","Garza","Boone","Sloan","Villa","Gill","Boyd","Foster","Bryant","Mcguire","Hendricks","Kennedy","Duke","Jacobs","Fleming"];

        let userNames = ["adm0001", "adm0002", "adm0003", "adm0004", "adm0005", "adm0006", "adm0007", "adm0008", "adm0009",
            "adm0010", "adm0011", "adm0012", "adm0013", "adm0014", "adm0015", "adm0016", "adm0017", "adm0018", "adm0019",
            "adm0020", "adm0021", "adm0022", "adm0023", "adm0024", "adm0025", "adm0026", "adm0027", "adm0028", "adm0029",
            "adm0030", "adm0031", "adm0032", "adm0033", "adm0034", "adm0035", "adm0036", "adm0037", "adm0038", "adm0039", "adm0040", "adm0041", "adm0042", "adm0043", "adm0044"];

        let email = ["User1@hotmail.com", "aUser2@hotmail.com", "User3@hotmail.com", "Userp1@hotmail.com", "Userp2@hotmail.com",
            "User4@hotmail.com", "User5@hotmail.com", "User6@hotmail.com", "User7@hotmail.com", "User8@hotmail.com",
            "User9@hotmail.com", "User10@hotmail.com", "User11@hotmail.com", "User12@hotmail.com", "User13@hotmail.com",
            "aUser14@hotmail.com", "User15@hotmail.com", "User16@hotmail.com", "User17@hotmail.com", "User18@hotmail.com",
            "User19@hotmail.com", "User20@hotmail.com", "User21@hotmail.com", "User22@hotmail.com", "User23@hotmail.com",
            "User24@hotmail.com", "User25@hotmail.com", "aUser26@hotmail.com", "User27@hotmail.com", "User28@hotmail.com",
            "User29@hotmail.com", "User30@hotmail.com", "User31@hotmail.com", "User32@hotmail.com", "User33@hotmail.com",
            "User34@hotmail.com", "User35@hotmail.com", "User36@hotmail.com", "User37@hotmail.com", "aUser38@hotmail.com",
            "User39@hotmail.com", "User40@hotmail.com", "User41@hotmail.com", "User42@hotmail.com"];

        let userTypes = ["Developer","Domain"];

        //Meteor requires the user must have a username field.
        var users = [];

        for(let i = 0; i < email.length; i++){
            let person = null;
            if(i % 1 === 0){
                person = {firstName: firstNames[i], lastName: lastNames[i], adm: userNames[i], password: "12345678", email: email[i], groupds: [1,2], userType: userTypes[0]};

            }
            if(i % 2 === 0){
                person = {firstName: firstNames[i], lastName: lastNames[i], adm: userNames[i], password: "12345678", email: email[i], groupds: [2,3], userType: userTypes[1]};
            }
            if(i % 3 === 0){
                person = {firstName: firstNames[i], lastName: lastNames[i], adm: userNames[i], password: "12345678", email: email[i], groupds: [3,4], userType: userTypes[0]};
            }
            if(i % 4 === 0){
                person = {firstName: firstNames[i], lastName: lastNames[i], adm: userNames[i], password: "12345678", email: email[i], groupds: [4,1], userType: userTypes[1]};
            }
            console.log(person);
            users.push(person);
        }


        let configCount = 0;
        _.each(users, (userData) => {
            let id;

            id = Accounts.createUser({
                username: userData.adm,
                password: userData.password,
                email: userData.email
            });

            const identity = {
                firstName: userData.firstName,
                lastName: userData.lastName,
                groups: userData.groupds,
                userType: userData.userType
            }

            Meteor.users.update({_id: id}, {$set:{profile: identity}});

            //console.log(userData.getGroups());

            // for (let [key, value] of userData.getGroups()) {
            //     //console.log(key + ' = ' + value);
            //     Roles.addUsersToRoles(id, value, key);
            // }

        });

        //     //Meteor.users.update({_id: id}, {$set:{'name.0.verified': true}});

        console.log("Accounts created."); console.log(configCount);
    }

});


// {firstName: "James", lastName: "Brown", username: "adm1112", password: "12345678", email:"User1@hotmail.com",          },
// {firstName: "James", lastName: "Henry", username: "adm1143", password: "12345678", email:"aUser2@hotmail.com",         },
// {firstName: "Joe",  lastName: "Brown", username: "adm1144", password: "12345678", email:"User3@hotmail.com",           },
// {firstName: "Prod", lastName: "Admin", username: "adm1146", password: "12345678", email:"Userp1@hotmail.com",          },
//
// {firstName: "Prod", lastName: "Installer", username: "adm1147", password: "12345678", email:"Userp2@hotmail.com",      },
// {firstName: "Fred", lastName: "Flintstone", username: "adm1145", password: "12345678", email:"User4@hotmail.com",      },
// {firstName: "Barney", lastName: "Rubble", username: "adm1155", password: "12345678", email:"User5@hotmail.com",        },
// {firstName: "Stevie", lastName: "Wonder", username: "adm1166", password: "12345678", email:"User6@hotmail.com",        },
// {firstName: "LL",   lastName: "Kool J", username: "adm1177", password: "12345678", email:"User7@hotmail.com",          },
// {firstName: "Harry", lastName: "Potter", username: "adm1188", password: "12345678", email:"User8@hotmail.com",         },
// {firstName: "Elizabeth", lastName: "Turner", username: "adm1199", password: "12345678", email:"User9@hotmail.com",     },
// {firstName: "Mario", lastName: "Wally", username: "adm1100", password: "12345678", email:"User10@hotmail.com",         },
// {firstName: "Kate", lastName: "Oslow", username: "adm0011", password: "12345678", email:"User11@hotmail.com",          },
// {firstName: "Wheres", lastName: "Wally", username: "adm0012", password: "12345678", email:"User12@hotmail.com",        },
// {firstName: "Allen", lastName: "Travis", username: "adm1113", password: "12345678", email:"User13@hotmail.com",        },
// {firstName: "Callum", lastName: "Fry", username: "adm1114", password: "12345678", email:"aUser14@hotmail.com",         },
// {firstName: "Jeremiah", lastName: "Baxter", username: "adm1115", password: "12345678", email:"User15@hotmail.com",     },
// {firstName: "Londyn", lastName: "Bridges", username: "adm1116", password: "12345678", email:"User16@hotmail.com",      },
// {firstName: "Amelie", lastName: "Baker", username: "adm1117", password: "12345678", email:"User17@hotmail.com",        },
// {firstName: "Ally", lastName: "Harding", username: "adm1118", password: "12345678", email:"User18@hotmail.com",        },
// {firstName: "Nathen", lastName: "Conway", username: "adm1119", password: "12345678", email:"User19@hotmail.com",       },
// {firstName: "Isabel", lastName: "Chapman", username: "adm1120", password: "12345678", email:"User20@hotmail.com",      },
// {firstName: "Clarissa", lastName: "Zamora", username: "adm1121", password: "12345678", email:"User21@hotmail.com",     },
// {firstName: "Cali", lastName: "Townsend", username: "adm1122", password: "12345678", email:"User22@hotmail.com",       },
// {firstName: "Julianna", lastName: "Mcmahon", username: "adm1123", password: "12345678", email:"User23@hotmail.com",    },
// {firstName: "Byron", lastName: "Guerra", username: "adm1124", password: "12345678", email:"User24@hotmail.com",        },
// {firstName: "Ali", lastName: "Gilmore", username: "adm1125", password: "12345678", email:"User25@hotmail.com",         },
// {firstName: "Natalee", lastName: "Garza", username: "adm1126", password: "12345678", email:"aUser26@hotmail.com",      },
// {firstName: "Heath", lastName: "Boone", username: "adm1127", password: "12345678", email:"User27@hotmail.com",         },
// {firstName: "Zoie", lastName: "Sloan", username: "adm1128", password: "12345678", email:"User28@hotmail.com",          },
// {firstName: "Jaqueline", lastName: "Villa", username: "adm1129", password: "12345678", email:"User29@hotmail.com",     },
// {firstName: "Madden", lastName: "Gill", username: "adm1130", password: "12345678", email:"User30@hotmail.com",         },
// {firstName: "Cierra", lastName: "Boyd", username: "adm1131", password: "12345678", email:"User31@hotmail.com",         },
// {firstName: "Drake", lastName: "Foster", username: "adm1132", password: "12345678", email:"User32@hotmail.com",        },
// {firstName: "Dominique", lastName: "Bryant", username: "adm1133", password: "12345678", email:"User33@hotmail.com",    },
// {firstName: "Isaias", lastName: "Mcguire", username: "adm1134", password: "12345678", email:"User34@hotmail.com",      },
// {firstName: "Casey", lastName: "Hendricks", username: "adm1135", password: "12345678", email:"User35@hotmail.com",     },
// {firstName: "Jamison", lastName: "Kennedy", username: "adm1136", password: "12345678", email:"User36@hotmail.com",     },
// {firstName: "Cullen", lastName: "Duke", username: "adm1137", password: "12345678", email:"User37@hotmail.com",         },
// {firstName: "Faith", lastName: "Jacobs", username: "adm1138", password: "12345678", email:"aUser38@hotmail.com",       },
// {firstName: "Jessie", lastName: "West", username: "adm1139", password: "12345678", email:"User39@hotmail.com",         },
// {firstName: "Simone", lastName: "Schmidt", username: "adm1140", password: "12345678", email:"User40@hotmail.com",      },
// {firstName: "Melissa", lastName: "Contreras", username: "adm1141", password: "12345678", email:"User41@hotmail.com",   },
// {firstName: "Andy", lastName: "Fleming", username: "adm1142", password: "12345678", email:"User42@hotmail.com",        }


