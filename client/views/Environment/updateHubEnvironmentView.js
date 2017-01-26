/**
 * Created by adm9360 on 4/11/2016.
 */

Template.updateHubEnvironmentView.onCreated(function () {

});

Template.updateHubEnvironmentView.helpers({
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
});

Template.updateHubEnvironmentView.events({

});