/**
 * Created by holly on 29/01/17.
 */

////////////////////////////////////////////
/// Application Roles: These are the roles a user can be assigned.
/// The Ultimate God role is Roles.GLOBAL_GROUP, but is not used here


ApplicationRoles = {
    Analyst: 1,
    Installer: 2,
    Administrator: 3,
    SuperUser: 4,
    properties: {
        1: {roles: ['read-only'], group: 'Analyst'},
        2: {roles: ['manage-apps', 'manage-versions', 'manage-routing', 'manage-roles'], group: 'Installer'},
        3: {roles: ['manage-roles'], group: 'Administrator'},
        4: {roles: ['super-user'], group: 'SuperUser'}
    }
};

ApplicationRoles.getApplicationRolesByGroup = function(role){
    if(role === ApplicationRoles.properties[ApplicationRoles.Analyst].group){
        return ApplicationRoles.properties[ApplicationRoles.Analyst].roles;
    }
    else if(role === ApplicationRoles.properties[ApplicationRoles.Installer].group){
        return ApplicationRoles.properties[ApplicationRoles.Installer].roles;
    }
    else if(role === ApplicationRoles.properties[ApplicationRoles.Administrator].group){
        return ApplicationRoles.properties[ApplicationRoles.Administrator].roles;
    }
    else if(role === ApplicationRoles.properties[ApplicationRoles.SuperUser].group){
        return ApplicationRoles.properties[ApplicationRoles.SuperUser].roles;
    }
}

EnvironmentGroups = {
    VMV: "VMV",
    DEV: "DEV",
    DTL: "DTL",
    PROD: "PROD"
}



