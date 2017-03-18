/**
 * Created by adm9360 on 3/11/2016.
 */

Template.updateUberHubEnvironmentView.onCreated(function(){

});

Template.updateUberHubEnvironmentView.helpers({

    getName: function() {
        if(Environments.environmentItem.get()){
            return Environments.environmentItem.get().ENVIRONMENT_NME;
        }
        else {
            return "";
        }
    },

    getDesc: function() {
        if(Environments.environmentItem.get()){
            return Environments.environmentItem.get().ENVIRONMENT_NME;
        }
        else {
            return "";
        }
    },

    getServer: function() {
        if(Configurations.updateUberHubEnvItem.get()){
            return Configurations.updateUberHubEnvItem.get().DATABASE_SERVER;
        }
        else {
            return "";
        }
    },

    getDatabase: function() {
        if(Configurations.updateUberHubEnvItem.get()){
            return Configurations.updateUberHubEnvItem.get().DATABSE;
        }
        else {
            return "";
        }
    },

    getUserName: function() {
        if(Configurations.updateUberHubEnvItem.get()){
            return Configurations.updateUberHubEnvItem.get().USERNAME;
        }
        else {
            return "";
        }
    },

    getPassword: function() {
        if(Configurations.updateUberHubEnvItem.get()){
            return Configurations.updateUberHubEnvItem.get().PASSWD;
        }
        else {
            return "";
        }
    },

    getDataSource: function() {
        if(Configurations.updateUberHubEnvItem.get()){
            return Configurations.updateUberHubEnvItem.get().DATASOURCE;
        }
        else {
            return "";
        }
    },

    getPerfHours: function() {
        if(Configurations.updateUberHubEnvItem.get()){
            return Configurations.updateUberHubEnvItem.get().PERF_HOURS;
        }
        else {
            return "";
        }
    },

    getUrl: function() {
        if(Environments.environmentItem.get()){
            return Environments.environmentItem.get().URL;
        }
        else {
            return "";
        }
    },

    getAdminUrl: function() {
        if(Environments.environmentItem.get()){
            return Environments.environmentItem.get().ADMIN_PAGE_URL;
        }
        else {
            return "";
        }
    }
});

Template.updateUberHubEnvironmentView.events({

});