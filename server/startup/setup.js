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
    // const ident = UserTypes.Developer;
    // console.log("start");
    // const myData = new Map();
    // _.each(ident.Groups, (item) => {
    //     console.log(item.groupName);
    //     console.log(item.roles);
    //     myData.set(item.groupName, item.roles);
    // });
    // console.log("end");
    //
    // for (let [key, value] of myData) {
    //     console.log(key + ' = ' + value);
    // }

    const appUser = new Developer("James", "Brown", "adm1112", "12345678", "User1@hotmail.com");
    appUser.setFirstName("bob");
    for (let [key, value] of appUser.groups) {
        console.log(key + ' = ' + value);
    }

    ////////////////////////////////////////////////////////////////////
    // Create Default Users
    //
    // if (Meteor.users.find().fetch().length === 0) {

        //const env = {dom: 'TEST', dev: 'DEV', dom: 'PROD'};

        console.log('Creating users: ');
        let firstNames = ["James", "James","Joe","Prod","Prod","Fred","Barney","Stevie","LL","Harry","Elizabeth", "Mario","Kate",
            "Wheres","Allen","Callum","Jeremiah","Londyn","Amelie","Ally","Nathen","Isabel","Clarissa", "Cali", "Julianna","Byron",
            "Ali", "Natalee", "Heath","Zoie","Jaqueline", "Madden", "Cierra", "Drake", "Dominique", "Isaias", "Casey","Jamison","Cullen","Faith","Jessie","Simone","Melissa","Andy"];

        let lastNames = ["Brown", "Henry", "Brown", "Admin", "Installer", "Flintstone", "Rubble","Wonder","Kool J","Potter",
            "Turner","Wally","Oslow","Wally","Travis","Fry","Baxter","Bridges","Baker","Harding","Conway","Chapman","Zamora",
            "Townsend","Mcmahon","Guerra","Gilmore","Garza","Boone","Sloan","Villa","Gill","Boyd","Foster","Bryant","Mcguire","Hendricks","Kennedy","Duke","Jacobs","Fleming"];

        let userNames = ["adm1112", "adm1143", "adm1144", "adm1146", "adm1147", "adm1145", "adm1155", "adm1166", "adm1177",
            "adm1188", "adm1199", "adm1100", "adm0011", "adm0012", "adm1113", "adm1114", "adm1115", "adm1116", "adm1117",
            "adm1118", "adm1119", "adm1120", "adm1121", "adm1122", "adm1123", "adm1124", "adm1125", "adm1126", "adm1127",
            "adm1128", "adm1129", "adm1130", "adm1131", "adm1132", "adm1133", "adm1134", "adm1135", "adm1136", "adm1137", "adm1138", "adm1139", "adm1140", "adm1141", "adm1142"];

        let email = ["User1@hotmail.com", "aUser2@hotmail.com", "User3@hotmail.com", "Userp1@hotmail.com", "Userp2@hotmail.com",
            "User4@hotmail.com", "User5@hotmail.com", "User6@hotmail.com", "User7@hotmail.com", "User8@hotmail.com",
            "User9@hotmail.com", "User10@hotmail.com", "User11@hotmail.com", "User12@hotmail.com", "User13@hotmail.com",
            "aUser14@hotmail.com", "User15@hotmail.com", "User16@hotmail.com", "User17@hotmail.com", "User18@hotmail.com",
            "User19@hotmail.com", "User20@hotmail.com", "User21@hotmail.com", "User22@hotmail.com", "User23@hotmail.com",
            "User24@hotmail.com", "User25@hotmail.com", "aUser26@hotmail.com", "User27@hotmail.com", "User28@hotmail.com",
            "User29@hotmail.com", "User30@hotmail.com", "User31@hotmail.com", "User32@hotmail.com", "User33@hotmail.com",
            "User34@hotmail.com", "User35@hotmail.com", "User36@hotmail.com", "User37@hotmail.com", "aUser38@hotmail.com",
            "User39@hotmail.com", "User40@hotmail.com", "User41@hotmail.com", "User42@hotmail.com"];

        //Meteor requires the user must have a username field.
        var users = [];

        for(let i = 0; i < 44; i++){
            if(i % 2 === 0){
                let dev = new Developer(firstNames[i], lastNames[i], userNames[i], "1234", email[i]);
                users.push(dev);
            }
            else {
                let domUser = new DomainUser(firstNames[i], lastNames[i], userNames[i], "1234", email[i]);
                users.push(domUser);
            }
        }


        let configCount = 0;
        _.each(users, (userData) => {
            let id;

            if(userData instanceof Developer){
                console.log(userData.firstName);
            }
            // id = Accounts.createUser({
            //     username: userData.username,
            //     password: userData.password,
            //     email: userData.email
            // });
            //
            // const identity = {
            //     firstName: userData.firstName,
            //     lastName: userData.lastName
            // }
            //
            //
            // Meteor.users.update({_id: id}, {$set:{identity: identity}});
            // if(userData.UserTypes.name.isEqual(UserTypes.Developer.name)){
            //     console.log(UserTypes.Developer.Groups.VMV);
            //     let roles = [];
            //
            //     _.each(UserTypes.Domain.Groups.DOM, function(role){
            //         console.log(String(role.action).toString());
            //         roles.push(role.action);
            //     });
            //     console.log(JSON.stringify(roles));
            // }
            //if(userData.UserType)
            //Roles.addUsersToRoles(id, [userData.UserType], userData.PrimaryEnv);
            // Roles.addUsersToRoles(id, UserTypes.Configurator, UserType.Configurator);
            // Roles.addUsersToRoles(id, UserTypes.Administrator, UserType.Administrator);
            // Roles.addUsersToRoles(id, UserTypes.Analyst, UserType.Analyst);
        });

        //     // name verification
        //     //Meteor.users.update({_id: id}, {$set:{'name.0.verified': true}});

        //
        //     Roles.addUsersToRoles(id, userData.groups.TEST, 'TEST');
        //     Roles.addUsersToRoles(id, userData.groups.DEV, 'DEV');
        //     Roles.addUsersToRoles(id, userData.groups.PROD, 'PROD');
        //
        // });
        console.log("Accounts created."); console.log(configCount);
    // }

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


