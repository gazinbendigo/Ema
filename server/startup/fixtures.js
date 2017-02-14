/**
 * Created by adm9360 on 10/12/2015.
 */

var baseApiUrl = Meteor.settings.baseApiURL;

// Meteor.startup(function() {
//     UserEnvironments.remove({});
//     if(UserEnvironments.find().count() === 0){
//         UserEnvironments.insert({USER_ENVIRONMENT: "DEV"});
//         UserEnvironments.insert({USER_ENVIRONMENT: "OTHER"});
//         UserEnvironments.insert({USER_ENVIRONMENT: "PROD"});
//     }
// });


Meteor.startup(function() {
    UserGroups.remove({});
    if(UserGroups.find().count() === 0){
        UserGroups.insert({Installer: "Installer"});
        UserGroups.insert({Administrator: "Administrator"});
        UserGroups.insert({Analyst: "Analyst"});
        UserGroups.insert({SuperUser: "SuperUser"});
    }


    Environments.remove({});
    // if(Environments.find().count() === 0){
    //     Environments.insert({ENVIRONMENT_ID: 1,ENVIRONMENT_NME: "HUBLD", ENVIRONMENT_DESCR: "Development", ENVIRONMENT_TYPE_ID: 1,URL: "",ADMIN_PAGE_URL: ""});
    //     Environments.insert({ENVIRONMENT_ID: 2,ENVIRONMENT_NME: "HUBA1", ENVIRONMENT_DESCR: "Development old", ENVIRONMENT_TYPE_ID: 1,URL: "",ADMIN_PAGE_URL: ""});
    //     Environments.insert({ENVIRONMENT_ID: 3,ENVIRONMENT_NME: "HUBA2", ENVIRONMENT_DESCR: "Development2", ENVIRONMENT_TYPE_ID: 1,URL: "",ADMIN_PAGE_URL: ""})
    //     Environments.insert({ENVIRONMENT_ID: 4,ENVIRONMENT_NME: "HUBB1", ENVIRONMENT_DESCR: "System Test", ENVIRONMENT_TYPE_ID: 1,URL: "",ADMIN_PAGE_URL: ""});
    //     Environments.insert({ENVIRONMENT_ID: 5,ENVIRONMENT_NME: "HUBB2", ENVIRONMENT_DESCR: "System Test2", ENVIRONMENT_TYPE_ID: 1,URL: "",ADMIN_PAGE_URL: ""});
    //     Environments.insert({ENVIRONMENT_ID: 6,ENVIRONMENT_NME: "HUBC1", ENVIRONMENT_DESCR: "System Integration", ENVIRONMENT_TYPE_ID: 1,URL: "",ADMIN_PAGE_URL: ""});
    //     Environments.insert({ENVIRONMENT_ID: 7,ENVIRONMENT_NME: "HUBC2", ENVIRONMENT_DESCR: "System Integration2", ENVIRONMENT_TYPE_ID: 1,URL: "",ADMIN_PAGE_URL: ""});
    //     Environments.insert({ENVIRONMENT_ID: 8,ENVIRONMENT_NME: "HUBD1", ENVIRONMENT_DESCR: "UAT", ENVIRONMENT_TYPE_ID: 1,URL: "",ADMIN_PAGE_URL: ""});
    //     Environments.insert({ENVIRONMENT_ID: 9,ENVIRONMENT_NME: "HUBD2", ENVIRONMENT_DESCR: "UAT2", ENVIRONMENT_TYPE_ID: 1,URL: "",ADMIN_PAGE_URL: ""});
    //     Environments.insert({ENVIRONMENT_ID: 10,ENVIRONMENT_NME: "HUBF1", ENVIRONMENT_DESCR: "Stressed and Volumed", ENVIRONMENT_TYPE_ID: 1,URL: "",ADMIN_PAGE_URL: ""});
    //     Environments.insert({ENVIRONMENT_ID: 11,ENVIRONMENT_NME: "HUBG1", ENVIRONMENT_DESCR: "TAN", ENVIRONMENT_TYPE_ID: 1,URL: "",ADMIN_PAGE_URL: ""});
    //     Environments.insert({ENVIRONMENT_ID: 12,ENVIRONMENT_NME: "HUBG2", ENVIRONMENT_DESCR: "RED", ENVIRONMENT_TYPE_ID: 1,URL: "",ADMIN_PAGE_URL: ""});
    //     Environments.insert({ENVIRONMENT_ID: 13,ENVIRONMENT_NME: "HUBI1", ENVIRONMENT_DESCR: "GOLD", ENVIRONMENT_TYPE_ID: 1,URL: "",ADMIN_PAGE_URL: ""});
    //     Environments.insert({ENVIRONMENT_ID: 14,ENVIRONMENT_NME: "HUBI2", ENVIRONMENT_DESCR: "BOB", ENVIRONMENT_TYPE_ID: 1,URL: "",ADMIN_PAGE_URL: ""});
    //     Environments.insert({ENVIRONMENT_ID: 15,ENVIRONMENT_NME: "HUBJ1", ENVIRONMENT_DESCR: "LIME", ENVIRONMENT_TYPE_ID: 1,URL: "",ADMIN_PAGE_URL: ""});
    //     Environments.insert({ENVIRONMENT_ID: 16,ENVIRONMENT_NME: "VMV0257", ENVIRONMENT_DESCR: "VMV0257", ENVIRONMENT_TYPE_ID: 2,URL:"http://vmv0257.bbldtl.int:4415",ADMIN_PAGE_URL: "http://vmv0257.bbldtl.int:7080/admin"});
    //     Environments.insert({ENVIRONMENT_ID: 17,ENVIRONMENT_NME: "VMV0105", ENVIRONMENT_DESCR: "VMV0105", ENVIRONMENT_TYPE_ID: 2,URL: "http://vmv0105.bbldtl.int:4415",ADMIN_PAGE_URL: "http://vmv0105.bbldtl.int:7080/admin"});
    //     Environments.insert({ENVIRONMENT_ID: 18,ENVIRONMENT_NME: "VMV0293", ENVIRONMENT_DESCR: "VMV0293", ENVIRONMENT_TYPE_ID: 2,URL: "http://VMV0293.bbldtl.int:4415",ADMIN_PAGE_URL: "http://VMV0293.bbldtl.int:7080/admin"});
    //     Environments.insert({ENVIRONMENT_ID: 19,ENVIRONMENT_NME: "HUBL1", ENVIRONMENT_DESCR: "HUBL1", ENVIRONMENT_TYPE_ID: 2,URL: "http://10.33.64.95:4414",ADMIN_PAGE_URL: "http://10.33.64.95:4414/admin"});
    //     Environments.insert({ENVIRONMENT_ID: 20,ENVIRONMENT_NME: "HUBC1", ENVIRONMENT_DESCR: "HUBC1", ENVIRONMENT_TYPE_ID: 2, URL: "http://10.33.64.88:4414",ADMIN_PAGE_URL: "http://10.33.64.88:4414/admin"});
    // }
});

// Meteor.startup(function(){
    // ConsumerProperties.remove({});
    // HubConsumers.remove({});
    //
    // if(HubConsumers.find().count() === 0){
    //     HubConsumers.insert({brandCde: 'GRB', appCde: 'IBS', instanceCde: 'D'});
    //     HubConsumers.insert({brandCde: 'GRB', appCde: 'BRF', instanceCde: 'D'});
    //     HubConsumers.insert({brandCde: 'GRB', appCde: 'GHJ', instanceCde: 'D'});
    //     HubConsumers.insert({brandCde: 'GRB', appCde: 'KLM', instanceCde: 'D'});
    //     HubConsumers.insert({brandCde: 'GRB', appCde: 'YTO', instanceCde: 'D'});
    //     HubConsumers.insert({brandCde: 'GRB', appCde: 'POR', instanceCde: 'D'});
    //     HubConsumers.insert({brandCde: 'TYP', appCde: 'IBS', instanceCde: 'D'});
    //     HubConsumers.insert({brandCde: 'GKL', appCde: 'AWD', instanceCde: 'D'});
    //     HubConsumers.insert({brandCde: 'JDM', appCde: 'MNM', instanceCde: 'D'});
    //     HubConsumers.insert({brandCde: 'JOB', appCde: 'IOP', instanceCde: 'D'});
    //     HubConsumers.insert({brandCde: 'ARB', appCde: 'KLR', instanceCde: 'D'});
    // }
    //
    // if(ConsumerProperties.find().count() === 0){
    //     ConsumerProperties._ensureIndex({ID: 1});
    //     ConsumerProperties.insert({PROPERTY_NAME: "ACC_HOLDING_UPDATE_OUT", PROPERTY_VALUE: "\\\\ddvmcm01\\mocom\\main\\data", CONSUMER_PROPERTY_ID: 1, CONSUMER_ID: 'ABCD1'});
    //     ConsumerProperties.insert({PROPERTY_NAME: "ACC_HOLDING_UPDATE_OUT", PROPERTY_VALUE: "\\\\ddvmcm01\\mocom\\main\\data", CONSUMER_PROPERTY_ID: 2, CONSUMER_ID: 'ABCD2'});
    //     ConsumerProperties.insert({PROPERTY_NAME: "ACTIVATE_ACC_IN", PROPERTY_VALUE: "\\\\bendpdc\\dfs\\BENHUBXFRDSH\\MLPI\\ACM\\In", CONSUMER_PROPERTY_ID: 3, CONSUMER_ID: 'ABCD3'});
    //     ConsumerProperties.insert({PROPERTY_NAME: "AGENCY_CODE", PROPERTY_VALUE: "98888", CONSUMER_PROPERTY_ID: 4, CONSUMER_ID: 'ABCD4'});
    //     ConsumerProperties.insert({PROPERTY_NAME: "ALERT_EMAIL_ADDRESS", PROPERTY_VALUE: "nobody", CONSUMER_PROPERTY_ID: 5, CONSUMER_ID: 'ABCD5'});
    //     ConsumerProperties.insert({PROPERTY_NAME: "ALIAS_ENQUIRY_URL", PROPERTY_VALUE: "http://vmv0595:9091/npp/bblwsenq", CONSUMER_PROPERTY_ID: 6, CONSUMER_ID: 'ABCD6'});
    //     ConsumerProperties.insert({PROPERTY_NAME: "ALIAS_MANAGEMENT_URL", PROPERTY_VALUE: "http://vmv0595:9091/npp/bblws", CONSUMER_PROPERTY_ID: 7, CONSUMER_ID: 'ABCD7'});
    //     ConsumerProperties.insert({PROPERTY_NAME: "ALIAS_PORTING_URL", PROPERTY_VALUE: "http://vmv0595:9091/npp/bblwsauto", CONSUMER_PROPERTY_ID: 8, CONSUMER_ID: 'ABCD8'});
    //     ConsumerProperties.insert({PROPERTY_NAME: "APPIAN_URL", PROPERTY_VALUE: "http://ddvbpm05/suite/webservice/processmodel/babAppianService", CONSUMER_PROPERTY_ID: 9, CONSUMER_ID: 'ABCD9'});
    //     ConsumerProperties.insert({PROPERTY_NAME: "AWAIT_IN", PROPERTY_VALUE: "\\\\bendpdc\\dfs\\BENHUBXFRDSH\\MLPI\\AM\\in", CONSUMER_PROPERTY_ID: 10, CONSUMER_ID: 'ABCD10'});
    //     ConsumerProperties.insert({PROPERTY_NAME: "AWAIT_MSGS_ARCHIVE_PATH", PROPERTY_VALUE: "\\\\bendpdc\\dfs\\BENHUBXFRDSH\\MLPI\\AM\\In\\Archive",  CONSUMER_PROPERTY_ID: 11, CONSUMER_ID: 'ABCD11'});
    // }
// });


Meteor.startup(function () {
    Applications.remove({});
    // if(Applications.find().count() === 0){
    //     Applications.insert({APPLICATION_ID: 1, APPLICATION_CDE: 'CRS', APPLICATION_NME: 'CRS'});
    //     Applications.insert({APPLICATION_ID: 2, APPLICATION_CDE: 'BEN', APPLICATION_NME: 'BEN'});
    //     Applications.insert({APPLICATION_ID: 3, APPLICATION_CDE: 'ERS', APPLICATION_NME: 'ERS'});
    //     Applications.insert({APPLICATION_ID: 4, APPLICATION_CDE: 'PBS', APPLICATION_NME: 'PBS'});
    //     Applications.insert({APPLICATION_ID: 5, APPLICATION_CDE: 'HUB', APPLICATION_NME: 'HUB'});
    //     Applications.insert({APPLICATION_ID: 6, APPLICATION_CDE: 'NFI', APPLICATION_NME: 'NFI'});
    //     Applications.insert({APPLICATION_ID: 7, APPLICATION_CDE: 'BDS', APPLICATION_NME: 'BDS'});
    //     Applications.insert({APPLICATION_ID: 8, APPLICATION_CDE: 'LLC', APPLICATION_NME: 'LLC'});
    //     Applications.insert({APPLICATION_ID: 9, APPLICATION_CDE: 'ABC', APPLICATION_NME: 'ABC'});
    //     Applications.insert({APPLICATION_ID: 10, APPLICATION_CDE: 'KFC', APPLICATION_NME: 'KFC'});
    // }
    //console.log(Applications.find().count());
});

Meteor.startup(() => {
    Configurations.remove({});
    // if(Configurations.find({}).count() === 0){
    //     Configurations.insert({CONFIGURATION_ID: 1, CONFIGURATION_NME: 'Development', DATABASE_SERVER: 'server1', DATABSE: 'db1', USERNAME: 'user1', PASSWD: 'pwd1', DATASOURCE: 'ds1', PREF_HOURS: 24 });
    //     Configurations.insert({CONFIGURATION_ID: 2, CONFIGURATION_NME: 'HUBB1', DATABASE_SERVER: 'server2', DATABSE: 'db2', USERNAME: 'user2', PASSWD: 'pwd2', DATASOURCE: 'ds2', PREF_HOURS: 24});
    //     Configurations.insert({CONFIGURATION_ID: 3, CONFIGURATION_NME: 'HUBC1', DATABASE_SERVER: 'server3', DATABSE: 'db3', USERNAME: 'user3', PASSWD: 'pwd3', DATASOURCE: 'ds3', PREF_HOURS: 24});
    // }
});



