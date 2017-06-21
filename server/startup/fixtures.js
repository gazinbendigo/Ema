/**
 * Created by adm9360_a on 17/03/2017.
 */


Meteor.startup(function() {

    UserTypesList.remove({});
    if (UserTypesList.find().count() === 0) {
        // UserTypesList.insert({USER_TYPE: UserTypes.Developer.name});
        // UserTypesList.insert({USER_TYPE: UserTypes.Domain.name});
        // UserTypesList.insert({USER_TYPE: UserTypes.SystemUser.name});
    }

    ApplicationRoles.remove({});
    if(ApplicationRoles.find({}).count() === 0){
        ApplicationRoles.insert({name: ApplicationFunctions.manageVersions, description: "Manage Versions"});
        ApplicationRoles.insert({name: ApplicationFunctions.listAccounts, description: "Manage Users"});
        ApplicationRoles.insert({name: ApplicationFunctions.manageRouting, description: "Manage Routing"});
        ApplicationRoles.insert({name: ApplicationFunctions.manageProps, description: "Manage Properties"});
        ApplicationRoles.insert({name: ApplicationFunctions.manageApps, description: "Manage Applications"});
        ApplicationRoles.insert({name: ApplicationFunctions.superUser, description: "Administrator"});
    }

    Environments.remove({});
    if(Environments.find({}).count() === 0){
        Environments.insert({ENV_ID: 1, ENV_CODE: "L1", FUNCTIONAL_NAME: "Development", TECHNICAL_NAME: "HUBD", IS_VISIBLE: 1});
        Environments.insert({ENV_ID: 2, ENV_CODE: "A1", FUNCTIONAL_NAME: "Functional", TECHNICAL_NAME: "HUBF" , IS_VISIBLE: 1});
        Environments.insert({ENV_ID: 3, ENV_CODE: "A2", FUNCTIONAL_NAME: "Functional", TECHNICAL_NAME: "HUBF" , IS_VISIBLE: 1});
        Environments.insert({ENV_ID: 4, ENV_CODE: "B1", FUNCTIONAL_NAME: "Functional", TECHNICAL_NAME: "HUBF" , IS_VISIBLE: 1});
        Environments.insert({ENV_ID: 5, ENV_CODE: "B2", FUNCTIONAL_NAME: "Functional", TECHNICAL_NAME: "HUBF" , IS_VISIBLE: 1});
        Environments.insert({ENV_ID: 6, ENV_CODE: "C1", FUNCTIONAL_NAME: "Functional", TECHNICAL_NAME: "HUBF" , IS_VISIBLE: 1});
        Environments.insert({ENV_ID: 7, ENV_CODE: "C2", FUNCTIONAL_NAME: "Functional", TECHNICAL_NAME: "HUBF" , IS_VISIBLE: 1});
        Environments.insert({ENV_ID: 8, ENV_CODE: "D2", FUNCTIONAL_NAME: "Functional", TECHNICAL_NAME: "HUBF" , IS_VISIBLE: 1});
        Environments.insert({ENV_ID: 9, ENV_CODE: "G1", FUNCTIONAL_NAME: "Functional", TECHNICAL_NAME: "HUBF" , IS_VISIBLE: 1});
        Environments.insert({ENV_ID: 10, ENV_CODE: "I1", FUNCTIONAL_NAME: "Functional", TECHNICAL_NAME: "HUBF" , IS_VISIBLE: 1});
        Environments.insert({ENV_ID: 11, ENV_CODE: "J1", FUNCTIONAL_NAME: "Functional", TECHNICAL_NAME: "HUBF" , IS_VISIBLE: 1});
        Environments.insert({ENV_ID: 12, ENV_CODE: "G2", FUNCTIONAL_NAME: "Functional", TECHNICAL_NAME: "HUBF" , IS_VISIBLE: 1});
        Environments.insert({ENV_ID: 13, ENV_CODE: "F1", FUNCTIONAL_NAME: "Non Functional", TECHNICAL_NAME: "HUBN", IS_VISIBLE: 1});
        Environments.insert({ENV_ID: 14, ENV_CODE: "D1", FUNCTIONAL_NAME: "Enterprise Integration", TECHNICAL_NAME: "HUBO", IS_VISIBLE: 1});
        Environments.insert({ENV_ID: 15, ENV_CODE: "H1", FUNCTIONAL_NAME: "Enterprise Integration", TECHNICAL_NAME: "HUBO", IS_VISIBLE: 1});
        Environments.insert({ENV_ID: 16, ENV_CODE: "P1", FUNCTIONAL_NAME: "Production", TECHNICAL_NAME: "HUBP", IS_VISIBLE: 2});
        Environments.insert({ENV_ID: 17, ENV_CODE: "R1", FUNCTIONAL_NAME: "Disaster Recovery", TECHNICAL_NAME: "HUBR", IS_VISIBLE: 2});
    }



});