/**
 * Created by holly on 29/01/17.
 */

////////////////////////////////////////////
/// Application Roles: These are the roles a user can be assigned.
/// The Ultimate God role is Roles.GLOBAL_GROUP, but is not used here


EnvironmentTypes = {
    VMV: "VMV",
    DEV: "DEV",
    DTL: "DTL",
    PROD: "PROD"
}


// ApplicationRoles = {
//     1: {action: 'read-only'},
//     2: {action: 'manage-apps'},
//     3: {action: 'manage-versions'},
//     4: {action: 'manage-routing'},
//     5: {action: 'manage-props'},
//     6: {action: 'manage-users'},
//     7: {action: 'super-user'}
// }

ApplicationFunctions = {
    readOnly: "ReadOnly",
    manageApps: "ManageApps",
    manageVersions: "ManageVersions",
    manageRouting: "ManageRouting",
    manageProps: "ManageProps",
    manageUsers: "ManageUsers",
    superUser: "SuperUser"
}

// UserTypes = {
//     Developer: {Groups: [{groupName: 'VMV', roles: [ApplicationFunctions.superUser]}, {groupName: 'DEV', roles: [ApplicationFunctions.superUser]}]},
//     Domain: {Groups: [{DOM: [ApplicationRoles[2], ApplicationRoles[3], ApplicationRoles[4], ApplicationRoles[5]]}]},
//     SystemUser: {Groups: [{SYS: [ApplicationRoles[7]]}]}
// }

GroupTypes = {
    VMV: "VMV",
    DEV: "DEV",
    DOM: "DOM"
}






