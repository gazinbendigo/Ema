/**
 * Created by adm9360 on 21/09/2016.
 */

const configFormType = "configFormType";
const createVMV = "createVMVView";
const environmentCount = "EnvironmentCount";
const createUberHub = "createUberHubView";
const createOldHub = createVMV;
const defaultSelectItem = "select";
const successMessage = "Environment Created.";
const errorMessage = "Oops! Something went wrong.";

Template.createEnvironment.onCreated(function() {
    Environments.getFromServer();
    Configurations.getFromServer();
    ConfigurationType.getFromServer();
    Session.set(environmentCount, Environments.size());
    //this.selectedConfig = new ReactiveVar(null);
    this.envSize = new ReactiveVar(0);
    this.successMessage = new ReactiveVar(successMessage);
});

Template.createEnvironment.helpers({

    defaultSelectItem: function(){
        return defaultSelectItem;
    },

    successMessage: function() {
        return Template.instance().successMessage.get();
    },

    getConfigurations: function () {
        return Configurations.find({});
    },

    getConfigurationView: function(){
        return ConfigurationType.view.get();
    },

    getConfigurationTypes: function(){
        return ConfigurationType.find({});
    },

    configurationType: function (name) {
        return {key:name, selected: '', value: name};
    },

    // selectedConfig: function(){
    //     return Template.instance().selectedConfig.get();
    // }
});

Template.createEnvironment.events({
    //Set the view type
    "change #configType": function(event, template){
        event.preventDefault();
        template.envSize.set(Environments.size());
        let view = template.find("#configType").value.trim();
        if(view === defaultSelectItem){
            ConfigurationType.hideView();
            showButtons(false);
        }
        else if(view === "VMV") {
            ConfigurationType.showView(createVMV);
            showButtons(true);
        }
        else if(view === "HUB"){
            ConfigurationType.showView(createVMV);
            showButtons(true);
        }
        else if(view === "UBER-HUB"){
            ConfigurationType.showView(createUberHub);
            showButtons(true);
        }
    },

    "click #createEnvBttn": (event, template) => {
        event.preventDefault();
        let typeName = template.find("#configType").value;
        let configType = ConfigurationType.findOne({TYPE_NME: typeName}, {fields: {CONFIGURATION_TYPE_ID: 1,"_id": 0 }});

        if(ConfigurationType.view.get() === createVMV){
            //Crete VM or Old Hub environment
            let url = "";
            let adminPage = "";
            if(typeName === "VMV"){
                url = buildVMEnvironmentUrl(template.find("#name").value);
                adminPage = buildVMAdminUrl(template.find("#name").value);
            }
            let environment = {
                nme: template.find("#name").value,
                desc: template.find("#description").value,
                configTypeId: configType.CONFIGURATION_TYPE_ID,
                url: url,
                adminUrl: adminPage
            }

            Environments.createEnvironment(environment, configType.CONFIGURATION_TYPE_ID, function(err, res){
                if(!err){
                    if(Environments.size() > template.envSize.get()){
                        resetFormFields(template);
                        template.successMessage.set("Environment " + environment.nme + " created.");
                        ConfigurationType.hideView();
                        showButtons(false);
                        showMessage(true);
                    }
                    else{
                        ConfigurationType.hideView();
                        template.successMessage.set(errorMessage);
                    }
                }
            });

        }
        else {
            //Create a new Hub environment or Other
            let environment = {
                nme: template.find("#name").value,
                desc: template.find("#description").value,
                configTypeId: configType.CONFIGURATION_TYPE_ID,
                svr: template.find("#databaseServer").value,
                database: template.find("#database").value,
                userName: template.find("#userName").value,
                pwd: template.find("#password").value,
                datasource: template.find("#datasource").value,
                perfHrs: Number(template.find("#perfHours").value),
                configId: configType.CONFIGURATION_TYPE_ID,
                url: template.find("#url").value,
                adminUrl: template.find("#adminUrl").value
            }
            Environments.createEnvironment(environment, configType.CONFIGURATION_TYPE_ID);
        }
        if(Environments.size() > template.envSize.get()){
            //console.log("Env Added");
            resetFormFields(template);

        }
    },

    "click #resetBttn": function(event, template){
        event.preventDefault();
        resetFormFields(template);
    }
});

function showMessage(value){
    if(value === true){
        $(".success-message").css('visibility', 'visible');
    }
    else {
        $(".success-message").css('visibility', 'hidden');
    }
}

function showButtons(value){
    if(value === true){
        $("#container-view").css('visibility', 'visible');
    }
    else {
        $("#container-view").css('visibility', 'hidden');
    }
}

function buildVMEnvironmentUrl(value){
    //Common format: http://vmv0257.bbldtl.int:4415
    return 'http://' + value + '.bbldtl.int:4415';
}

function buildVMAdminUrl(value){
    //Common format: //http://vmv0257.bbldtl.int:7080/admin
    return 'http://' + value + '.bbldtl.int:7080/admin';
}

/**
 * This will clear everything including checkbox values Radio bttns and select.
 * To remove a range of input types declare them like so: input:text, input:password etc.
 * You could do $('input:checkbox, input:radio').removeAttr('checked').removeAttr('selected');
 * for those types.
 * @param template
 */
function resetFormFields(template){
    template.find($(':input').val(''));
    template.find($('select').val('select'));
}

