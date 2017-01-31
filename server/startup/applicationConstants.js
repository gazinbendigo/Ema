/**
 * Created by holly on 29/01/17.
 */

////////////////////////////////////////////
/// Application Roles: These are the roles a user can be assigned.

ApplicationRoles.Analyst = [];

ApplicationRoles.Installer = ['manage-apps', 'manage-versions', 'manage-routing', 'manage-roles'];

ApplicationRoles.Operator = ['manage-apps', 'manage-versions', 'manage-routing', 'manage-roles'];

ApplicationRoles.SuperUser = ['admin', 'super-user'];

UserEnvironments = {
    dev: "DEV",
    dtl: "DTL",
    prod: "PROD"
};

ApplicationFunctions = {
    Installer: "Installer",
    Operator: "Operator",
    Analyst: "Analyst",
    SuperUser: Roles.GLOBAL_GROUP
};

