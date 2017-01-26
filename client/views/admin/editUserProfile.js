/**
 * Created by holly on 10/11/16.
 */

Template.editUserProfile.onCreated(function() {
    let template = Template.instance();
    template.subscribe("Users");

    let adm = FlowRouter.getParam("adm");
    let profile = Users.findOne({ADM: adm});
    console.log(profile);
    this.userProfile = new ReactiveVar(profile);
    this.installerRoleChkbx = new ReactiveVar(false);
    this.adminRoleChkbx = new ReactiveVar(false);
    this.superuserRoleChkbx = new ReactiveVar(false);
});

Template.editUserProfile.helpers({

    getUserProfile: function(){
        return Template.instance().userProfile.get();
    },

    applyInstallerRole: function(){
        if(Template.instance().installerRoleChkbx.get() === true){
            return 'checked';
        }
        return null;
    },

    applyAdminRole: function(){
        if(Template.instance().adminRoleChkbx.get() === true){
            return 'checked';
        }
        return null;
    },

    applySuperuserRole: function(){
        if(Template.instance().superuserRoleChkbx.get() === true){
            return 'checked';
        }
        return null;
    }
});

Template.editUserProfile.events({

    "click #cancelProfile": function(event, template){
        event.preventDefault();
        FlowRouter.go("manageusers");
    },

    'click #installerRoleChkbx': (event, template) => {
        event.preventDefault();
        console.log("installerRoleChkbx");
        let isChecked = $('#installerRoleChkbx').is(":checked");
        template.installerRoleChkbx.set(isChecked);
    },

    'click #adminRoleChkbx': (event, template) => {
        event.preventDefault();
        console.log("adminRoleChkbx");
        let isChecked = $('#adminRoleChkbx').is(":checked");
        template.adminRoleChkbx.set(isChecked);
    },

    'click #superuserRoleChkbx': (event, template) => {
        event.preventDefault();
        console.log("superuserRoleChkbx");
        let isChecked = $('#superuserRoleChkbx').is(":checked");
        template.superuserRoleChkbx.set(isChecked);
    }
});