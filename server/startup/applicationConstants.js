/**
 * Created by holly on 29/01/17.
 */

////////////////////////////////////////////
/// Application Roles: These are the roles a user can be assigned.

ApplicationRoles = {
    Analyst: [],
    Installer: ['manage-apps', 'manage-versions', 'manage-routing', 'manage-roles'],
    Administrator: ['manage-roles'],
    SuperUser: ['super-user']
}

UserEnvironments = {
    dev: "DEV",
    dtl: "DTL",
    prod: "PROD"
};

ApplicationFunctions = {
    Installer: "Installer",
    Administrator: "Admin",
    Analyst: "Analyst",
    SuperUser: Roles.GLOBAL_GROUP
};

