/**
 * Created by adm9360 on 28/10/2016.
 */

const configFormType = "configFormType";
const updateVMVView = "updateVmEnvironmentView";
const updateUberHubView = "updateUberHubEnvironmentView";
const updateHubView = "updateHubEnvironmentView";
var updateEnvironment = "updateEnvironment";
var UPDATE_ENV = new ReactiveVar(null);

Template.manageEnvironment.onCreated(function(){
    Environments.getFromServer();
    ConfigurationType.getFromServer();
    this.environmentType = new ReactiveVar(0);
    Environments.updateEnvironmentView.set("");

});

Template.manageEnvironment.helpers({

    getConfigurationTypes: function(){
        return ConfigurationType.find({});
    },

    configurationType: function (name) {
        return {key:name, selected: '', value: name};
    },

    getEnvironmentsByType: function(type){
        return Environments.getEnvironmentsByType(type);
    },

    getEnvironmentType: function(){
        return Template.instance().environmentType.get();
    },

    getView: function(){
        return Environments.updateEnvironmentView.get();
    }
});

Template.manageEnvironment.events({
    "change #configType": function(event, template){
        event.preventDefault();
        let formType = template.find("#configType").value;
        console.log(formType);
        //let configType = EnvironmentTypes.findOne({TYPE_NME: formType})
        template.environmentType.set(Number(formType));
        if(Number(formType) === 0){
            Environments.environmentItem.set(null);
            Environments.updateEnvironmentView.set("");
            $("#container-view").css('visibility', 'hidden');
        }
        if(Number(formType) === 1){
            //List VMV Environments
            Environments.updateEnvironmentView.set(updateVMVView);
            $("#container-view").css('visibility', 'visible');
        }
        else if(Number(formType) === 2){
            Environments.updateEnvironmentView.set(updateHubView);
            $("#container-view").css('visibility', 'visible');
        }
        else if(Number(formType) === 3){
            //List HUB Environments
            Environments.updateEnvironmentView.set(updateUberHubView);
            $("#container-view").css('visibility', 'visible');
        }

    },

    "click #envId": function(event, template){
        event.preventDefault();
        let env = Environments.findOne({ENVIRONMENT_ID: this.ENVIRONMENT_ID});
        Environments.environmentItem.set(env);
        let envType = ConfigurationType.findOne({CONFIGURATION_TYPE_ID: env.CONFIGURATION_TYPE_ID});
        if(envType.TYPE_NME === "UBER-HUB"){
            let envConfig = En
        }
    },

    "click #saveBttn": function(event, template){
        event.preventDefault();
        console.log("View: " + template.environmentType.get());

        if(template.environmentType.get() === 0){
            //Show error message
            console.log("show error");
        }
        else if(template.environmentType.get() === 1){
            //Update VMV Environment
            console.log("manage vmv");
            Environments.updateHubOrVm(Environments.environmentItem.get());
        }
        else if(template.environmentType.get() === 2){
            //Update Hub Environment
            console.log("manage hub");
            Environments.updateHubOrVm(Environments.environmentItem.get());
        }
        else {
            //Update Uber Hub Environment
            console.log("manage uber hub");

            let uberHubEnv = {
                nme: template.find("name").value,
                desc: template.find("description").value,
                configTypeId:  Environments.environmentItem.get().CONFIGURATION_TYPE_ID,
                svr: template.find("databaseServer").value,
                database: template.find("database").value,
                userName: template.find("userName").value,
                pwd: template.find("password").value,
                datasource: template.find("datasource").value,
                perfHrs: template.find("perfHours").value,
                configId: Environments.environmentItem.get().CONFIGURATION_TYPE_ID,
                url: template.find("url").value,
                adminUrl: template.find("adminUrl").value
            };

            Environments.updateUberHubEnvironment(uberHubEnv);
        }
    },

    "click #deleteBttn": function(event, template){
        event.preventDefault();
        Environments.deleteEnvironment(Environments.environmentItem.get().ENVIRONMENT_ID);
        resetFormFields(template);
    },

    "click #resetBttn": function(event, template){
        event.preventDefault();
        resetFormFields(template);
    }
});

/**
 * This will clear everything including checkbox values Radio bttns and select.
 * To remove a range of input types declare them like so: input:text, input:password etc.
 * You could do $('input:checkbox, input:radio').removeAttr('checked').removeAttr('selected');
 * for those types.
 * @param template
 */
function resetFormFields(template, configType){
    //Cover all bases
    template.find("#name").value = "";
    template.find("#description").value = "";

    if(configType === 1 || configType === 2){
        template.find("#url").value = "";
        template.find("#adminUrl").value = "";
    }
    if(configType === 2){
        template.find("#databaseServer").value = "";
        template.find("#database").value = "";
        template.find("#userName").value = "";
        template.find("#password").value = "";
        template.find("#datasource").value = "";
        template.find("#perfHours").value = null;
    }

    Environments.environmentItem.set(null);
}