/**
 * Created by adm9360 on 21/09/2016.
 */

Template.configuration.onCreated(function() {
    let template = Template.instance();
    template.subscribe("configurations");
    this.configName = new ReactiveVar(null);
    this.databaseServer = new ReactiveVar(null);
    this.database = new ReactiveVar(null);
    this.userName = new ReactiveVar(null);
    this.password = new ReactiveVar(null);
    this.datasource = new ReactiveVar(null);
    this.prefHours = new ReactiveVar(24);
    EnvironmentConfiguration.getFromServer();
});

Template.configuration.helpers({

    getConfigurations: function () {
        return Configurations.find({}, {sort: {CONFIGURATION_NME: 1}});
    },

    configurationsOptions: function(id, name) {
        return {key:id, selected: '', value: name};
    },

    configName: function() {
        return Template.instance().configName.get();
    },

    databaseServer: function() {
        return Template.instance().databaseServer.get();
    },

    database: function() {
        return Template.instance().database.get();
    },

    userName: function() {
        return Template.instance().userName.get();
    },

    password: function() {
        return Template.instance().password.get();
    },

    datasource: function() {
        return Template.instance().datasource.get();
    },

    prefHours: function() {
        return Template.instance().prefHours.get();
    }


});

Template.configuration.events({

    "keyup #configName": (event, template) =>{
        event.preventDefault();
        template.configName.set($('#configName').val());
    },

    "keyup #databaseServer": (event, template) =>{
        event.preventDefault();
        template.databaseServer.set(template.find("[name=databaseServer]").value);//$('#databaseServer').val());
    },

    "keyup #database": (event, template) =>{
        event.preventDefault();
        template.database.set($('#database').val());
    },

    "keyup #userName": (event, template) =>{
        event.preventDefault();
        template.userName.set($('#userName').val());
    },

    "keyup #password": (event, template) =>{
        event.preventDefault();
        template.password.set($('#password').val());
    },

    "keyup #datasource": (event, template) =>{
        event.preventDefault();
        template.datasource.set($('#datasource').val());
    },

    "keyup #prefHours": (event, template) =>{
        event.preventDefault();
        template.prefHours.set($('#prefHours').val());
    },

    "change #configOptions": function (event, template) {
        event.preventDefault();
        let configId = template.find('#configOptions').value;

        if(Number(configId) === 0){
            clearForm(template);
        }

        else if(Number(configId) > 0){
            let config = Configurations.find({CONFIGURATION_ID: Number(configId)}).fetch();
            template.configName.set(config[0].CONFIGURATION_NME);
            template.databaseServer.set(config[0].DATAASE_SERVER);
            template.database.set(config[0].DATABSE);
            template.userName.set(config[0].USERNAME);
            template.password.set(config[0].PASSWD);
            template.datasource.set(config[0].DATASOURCE);
            template.prefHours.set(config[0].PREF_HOURS);
        }

    },
    //
    // "click #updateConfigBttn": (event, template) => {
    //     event.preventDefault();
    //
    //     let configId = template.find('#configOptions').value;
    //     if(Number(configId) > 0){
    //         let configuration = createConfiguration(template, configId);
    //
    //         Configurations.applyChange('configuration', configuration, function(err, response){
    //             if(err){
    //                 console.log(err);
    //             }
    //             else {
    //                 template.find('#configOptions').value = 0;
    //                 clearForm(template);
    //             }
    //         });
    //     }
    //     else {
    //         console.log("Error");
    //     }
    // },

    "click #createBttn": (event, template) => {
        event.preventDefault();
        let configId = Configurations.find({}).count() + 1;

        let configuration = createConfiguration(template, configId);
        Configurations.applyChange('addConfiguration', configuration, function(err, response){
            if(err){
                console.log(err);
            }
            else {
                template.find('#configOptions').value = 0;
                clearForm(template);
            }
        });
    },

    "click #clearBttn": (event, template) => {
        event.preventDefault();

        template.find('#configOptions').value = 0;
        clearForm(template);
    },

    "click #deleteBttn": (event, template) => {
        event.preventDefault();

        let configId = template.find('#configOptions').value;
        console.log(configId);
        Configurations.applyChange('deleteConfiguration', Number(configId), function(err, response){
            if(err){
                console.log(err);
            }
            else {
                template.find('#configOptions').value = 0;
                clearForm(template);
            }
        });
    }
});

function clearForm(template){
    template.configName.set('');
    template.databaseServer.set('');
    template.database.set('');
    template.userName.set('');
    template.password.set('');
    template.datasource.set('');
    template.prefHours.set('');
}

function createConfiguration(template, configId){
    return {
        CONFIGURATION_ID: Number(configId),
        CONFIGURATION_NME: template.configName.get(),
        DATABASE_SERVER: template.databaseServer.get(),
        DATABSE: template.database.get(),
        USERNAME: template.userName.get(),
        PASSWD: template.password.get(),
        DATASOURCE: template.datasource.get(),
        PREF_HOURS: Number(template.prefHours.get())
    }
}