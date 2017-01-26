/**
 * Created by adm9360 on 3/11/2016.
 */

Template.updateVmEnvironmentView.onCreated(function(){

});

Template.updateVmEnvironmentView.helpers({
    getName: function(){
        if(Environments.environmentItem.get()){
            return Environments.environmentItem.get().ENVIRONMENT_NME;
        }
        else {
            return "";
        }
    },

    getDescription: () =>{
        if(Environments.environmentItem.get()){
            return Environments.environmentItem.get().ENVIRONMENT_DESCR;
        }
        else {
            return "";
        }
    },

    getUrl: () =>{
        if(Environments.environmentItem.get()){
            return Environments.environmentItem.get().URL;
        }
        else {
            return "";
        }
    },

    getAdminUrl: () =>{
        if(Environments.environmentItem.get()){
            return Environments.environmentItem.get().ADMIN_PAGE_URL;
        }
        else {
            return "";
        }
    },
});

Template.updateVmEnvironmentView.events({
    "keyup #name": function(event, template){
        event.preventDefault();
        Environments.environmentItem.get().ENVIRONMENT_NME = template.find("#name").value;
    },

    "keyup #description": function(event, template){
        event.preventDefault();
        Environments.environmentItem.get().ENVIRONMENT_DESCR = template.find("#description").value;
    },

    "keyup #url": function(event, template){
        event.preventDefault();
        Environments.environmentItem.get().URL = template.find("#url").value;
    },

    "keyup #adminUrl": function(event, template){
        event.preventDefault();
        Environments.environmentItem.get().ADMIN_PAGE_URL = template.find("#adminUrl").value;
    },

    "click #update": function(event, template){
        event.preventDefault();
    },

    "click #reset": function(event, template){
        event.preventDefault();
    }
});