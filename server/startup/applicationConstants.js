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


ApplicationFunctions = {
    1: {READ_ONLY: 'read-only'},
    2: {MANAGE_APPS: 'manage-apps'},
    3: {MANAGE_VERSIONS: 'manage-versions'},
    4: {MANAGE_ROUTING: 'manage-routing'},
    5: {ADMIN: 'manage-roles'},
    6: {INSTALL_APPS: 'install-apps'}
}


// GroupRoles = {
//     Dev: 1,
//     Dtl: 2,
//     Prod: 3,
//     EnvRoles: {
//         //1: {VMV: {Roles: [ApplicationFunctions.MANAGE_APPS, ApplicationFunctions.MANAGE_VERSIONS, ApplicationFunctions.MANAGE_ROUTING]}, DEV: {Roles: [ApplicationFunctions.MANAGE_APPS, ApplicationFunctions.MANAGE_VERSIONS, ApplicationFunctions.MANAGE_ROUTING]}, DTL: [ApplicationFunctions.READ_ONLY]}, PROD:{Roles: [ApplicationFunctions.READ_ONLY]}},
//         1: {VMV: {Roles: [ApplicationFunctions[2], ApplicationFunctions[3], ApplicationFunctions[4]]}, DEV: {Roles: [ApplicationFunctions[2], ApplicationFunctions[3], ApplicationFunctions[4]]}, DTL: [ApplicationFunctions[1]]}, PROD:{Roles: [ApplicationFunctions[1]]}
//         // 2: {VMV: {Roles: [ApplicationFunctions.READ_ONLY], DEV: {Roles: [ApplicationFunctions.READ_ONLY]}, DTL: {Roles: [ApplicationFunctions.MANAGE_APPS, ApplicationFunctions.MANAGE_VERSIONS, ApplicationFunctions.MANAGE_ROUTING]}, PROD:{Roles: [ApplicationFunctions.READ_ONLY]}},
//         // 3: {VMV: {Roles: [ApplicationFunctions.READ_ONLY]}, DEV: {Roles: [ApplicationFunctions.READ_ONLY]}, DTL: {Roles: [ApplicationFunctions.READ_ONLY]}, PROD:{Roles: [ApplicationFunctions.MANAGE_APPS, ApplicationFunctions.MANAGE_VERSIONS, ApplicationFunctions.MANAGE_ROUTING]}},
//     }
// }

UserType = {
    Developer: 'Developer',
    Configurator: 'Configurator',
    Administrator: 'Administrator',
    Analyst: 'Analyst',
    Installer: 'Installer'
}


Role = {
    Developer: {VMV: [ApplicationFunctions[2], ApplicationFunctions[3], ApplicationFunctions[4], ApplicationFunctions[6]], DEV: [ApplicationFunctions[2], ApplicationFunctions[3], ApplicationFunctions[4]], DTL: [ApplicationFunctions[1]], PROD: [ApplicationFunctions[1]]},
    Configurator: {VMV: [ApplicationFunctions[1]], DEV: [ApplicationFunctions[1]], DTL: [ApplicationFunctions[2], ApplicationFunctions[3], ApplicationFunctions[4], ApplicationFunctions[4]], PROD: [ApplicationFunctions[1]]},
    Administrator: {VMV: [ApplicationFunctions[5]], DEV: [ApplicationFunctions[5]], DTL: [ApplicationFunctions[5]], PROD: [ApplicationFunctions[5]]},
    Analyst: {VMV: [ApplicationFunctions[1]], DEV: [ApplicationFunctions[1]], DTL: [ApplicationFunctions[1]], PROD: [ApplicationFunctions[1]]},
}






