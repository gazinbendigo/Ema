/**
 * Created by holly on 10/11/16.
 */

Template.editUserProfile.onCreated(function() {

    Identities.getProfile(FlowRouter.getParam("adm"));
    this.profile = new ReactiveVar(null);
    this.userAccountGroups = new ReactiveVar(defaultGroups());
    this.userName = new ReactiveVar(null);
    this.firstName = new ReactiveVar(null);
    this.lastName = new ReactiveVar(null);
    this.email = new ReactiveVar(null);
    this.isDeveloperChkbx = new ReactiveVar(null);
    this.areDevRolesEnabled = new ReactiveVar(false);
    this.devInstallerRoleChkbx = new ReactiveVar(null);
    this.devAdminRoleChkbx = new ReactiveVar(null);
    this.devSuperuserRoleChkbx = new ReactiveVar(null);
    this.installerRoleChkbx = new ReactiveVar(null);
    this.adminRoleChkbx = new ReactiveVar(null);
    this.superuserRoleChkbx = new ReactiveVar(null);
    this.responseMsg = new ReactiveVar(null);

});



Template.editUserProfile.helpers({

    isLoaded: () => {
        if(Identities.isLoaded.get()){
            setFields(Identities.findOne({}));
            return true;
        }
        return false;
    },

    userData: () => {
        return Identities.findOne({});
    },


    PrimaryEnv: () => {
        return Template.instance().isDeveloperChkbx.get() ? 'checked' : null;
    },

    isInstaller: () => {
        return Template.instance().installerRoleChkbx.get();
    },

    isAdmin: () => {
        return Template.instance().adminRoleChkbx.get();
    },

    isSuperuser: () => {
        return Template.instance().superuserRoleChkbx.get();
    },

    isDevInstaller: () => {
        return Template.instance().devInstallerRoleChkbx.get();
    },

    isDevAdmin: () => {
        return Template.instance().devAdminRoleChkbx.get();
    },

    isDevSuperuser: () => {
        return Template.instance().devSuperuserRoleChkbx.get();
    },

    areDevRolesEnabled: () => {
        if(Template.instance().areDevRolesEnabled.get() === true){
            return '';
        }
        else {
            Template.instance().devInstallerRoleChkbx.set(null);
            Template.instance().devAdminRoleChkbx.set(null);
            Template.instance().devSuperuserRoleChkbx.set(null);
        }
        return  'disabled';
    },

    responseMsg: () => {
        return Template.instance().responseMsg.get();
    }
});

Template.editUserProfile.events({

    "change #adm": function(event, template){
        event.preventDefault();
        let adm = $('#adm').val();
        template.userName.set(adm);
        console.log(adm);
    },

    "change #firstname": (event, template) => {
        event.preventDefault();
        let firstName = $('#firstname').val();
        template.firstName.set(firstName);
        console.log(firstName);
    },

    "change #lastname": (event, template) => {
        event.preventDefault();
        let lastName = $('#lastname').val();
        template.lastName.set(lastName);
        console.log(lastName);
    },

    "change #email": (event, template) => {
        event.preventDefault();
        let email = $('#email').val();
        template.email.set(email);
        console.log(email);
    },

    "change #password": (event, template) => {
        event.preventDefault();
        let password = $('#password').val();
        template.password.set(password);
        console.log(password);
    },

    "change #confirmPassword": (event, template) => {
        event.preventDefault();
        let confirmPassword = $('#confirmPassword').val();
        console.log(confirmPassword);
    },

    "click #cancelProfile": function(event, template){
        event.preventDefault();
        FlowRouter.go("userprofiles");
    },

    "click #deleteProfile": function(event, template){
        event.preventDefault();
        console.log(template.userName.get());
        let user = Meteor.users.findOne({username: template.userName.get()});
        console.log(user);
        Meteor.call('deleteUser', user, function(err, res){
           if(err){
               console.log(err);
           }
           else {
               console.log(res);
               FlowRouter.go("userprofiles");
           }
        });
    },

    'click #isDeveloperChkbx': (event, template) => {
        event.preventDefault();
        let isChecked = $('#isDeveloperChkbx').is(":checked");
        template.isDeveloperChkbx.set(checkedValue(isChecked));
        template.areDevRolesEnabled.set(isChecked);
    },

    'click #installerRoleChkbx': (event, template) => {
        event.preventDefault();
        let isChecked = $('#installerRoleChkbx').is(":checked");
        template.installerRoleChkbx.set(checkedValue(isChecked));
        addOrRemoveRole('installer', isChecked, 'TEST', template);
    },


    'click #adminRoleChkbx': (event, template) => {
        event.preventDefault();
        console.log("adminRoleChkbx");
        let isChecked = $('#adminRoleChkbx').is(":checked");
        template.adminRoleChkbx.set(checkedValue(isChecked));
        addOrRemoveRole('administrator', isChecked, 'TEST', template);
    },

    'click #superuserRoleChkbx': (event, template) => {
        event.preventDefault();
        console.log("superuserRoleChkbx");
        let isChecked = $('#superuserRoleChkbx').is(":checked");
        template.superuserRoleChkbx.set(checkedValue(isChecked));
        addOrRemoveRole('super-admin', isChecked, 'TEST', template);
    },

    'click #isDevInstallerChkbx': (event, template) => {
        event.preventDefault();
        let isChecked = $('#isDevInstallerChkbx').is(":checked");
        template.devInstallerRoleChkbx.set(checkedValue(isChecked));
        addOrRemoveRole('installer', isChecked, 'DEV', template);
    },

    'click #isDevAdminRoleChkbx': (event, template) => {
        event.preventDefault();
        let isChecked = $('#isDevAdminRoleChkbx').is(":checked");
        template.devAdminRoleChkbx.set(checkedValue(isChecked));
        addOrRemoveRole('administrator', isChecked, 'DEV', template);
    },

    'click #isDevSuperuserRoleChkbx': (event, template) => {
        event.preventDefault();
        let isChecked = $('#isDevSuperuserRoleChkbx').is(":checked");
        template.devSuperuserRoleChkbx.set(checkedValue(isChecked));
        addOrRemoveRole('super-admin', isChecked, 'DEV', template);
    },

    'click #updateProfile': (event, template) => {
        event.preventDefault();
        let profile = Meteor.users.findOne({username: FlowRouter.getParam("adm")});
        let regex =  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(regex.test(template.email.get())){
            let userProfile = {
                id: profile._id,
                userName: template.userName.get(),
                password: template.password.get(), //template.password.get(),
                email: template.email.get(),
                firstName: template.firstName.get(),
                lastName: template.lastName.get(),
                roles: template.userAccountGroups.get()
            }
            Meteor.call('updateUser', profile, function(err, res){
                if(err){
                    template.responseMsg.set(err.error);
                }
                else {
                    console.log(res);
                    FlowRouter.go("userprofiles");
                }
            });
        }
        else {
            template.responseMsg.set("Invalid email address.");
        }
    }
});

function defaultGroups(){
    return {groups: {TEST: [], DEV: []}};
}

function addOrRemoveRole(role, action, groupType, template){
    if(action){
        if(groupType === 'DEV'){
            if(!_.contains( template.userAccountGroups.get().groups.DEV, role)){
                template.userAccountGroups.get().groups.DEV.push(role);
            }
        }
        else {
            if(!_.contains( template.userAccountGroups.get().groups.TEST, role)){
                template.userAccountGroups.get().groups.TEST.push(role);
            }
        }
    }
    else {
        if(groupType === 'DEV'){
            if(_.contains( template.userAccountGroups.get().groups.DEV, role)){
                let pos = _.indexOf( template.userAccountGroups.get().groups.DEV, role);
                template.userAccountGroups.get().groups.DEV.splice(pos, 1);
            }
        }
        else {
            if(_.contains( template.userAccountGroups.get().groups.TEST, role)){
                let pos = _.indexOf( template.userAccountGroups.get().groups.TEST, role);
                template.userAccountGroups.get().groups.TEST.splice(pos, 1);
            }
        }
    }
}

function checkedValue(checked){
    return checked ? 'checked' : null;
}

function isUserInRole(user, group, type){
    let isInRole = null;
    if(group === 'TEST'){
        isInRole =  _.contains(user.roles.TEST, type) ? 'checked' : null;
    }
    else{
        isInRole = _.contains(user.roles.DEV, type) ? 'checked' : null;
    }
    return isInRole;
}

function setFields(user){

    Template.instance().userName.set(user.username);
    Template.instance().firstName.set(user.profile.firstName);
    Template.instance().lastName.set(user.profile.lastName);
    Template.instance().email.set(user.emails[0].address);
    Template.instance().isDeveloperChkbx.set(checkedValue(user.profile.PrimaryEnv));
    Template.instance().areDevRolesEnabled.set(user.profile.PrimaryEnv);
    Template.instance().devInstallerRoleChkbx.set(isUserInRole(user, 'DEV', 'installer'));
    Template.instance().devAdminRoleChkbx.set(isUserInRole(user, 'DEV', 'administrator'));
    Template.instance().devSuperuserRoleChkbx.set(isUserInRole(user, 'DEV', 'super-admin'));
    Template.instance().installerRoleChkbx.set(isUserInRole(user, 'TEST', 'installer'));
    Template.instance().adminRoleChkbx.set(isUserInRole(user, 'TEST', 'administrator'));
    Template.instance().superuserRoleChkbx.set(isUserInRole(user, 'TEST', 'super-admin'));
}



