/**
 * Created by adm9360 on 20/01/2017.
 */


Template.addUserProfile.onCreated(function(){

    this.newUserProfile = new ReactiveVar(getEmptyProfile());
    this.username = new ReactiveVar(null);
    this.firstName = new ReactiveVar(null);
    this.lastName = new ReactiveVar(null);
    this.email = new ReactiveVar(null);
    this.password = new ReactiveVar(null);
    this.confirmPassword = new ReactiveVar(null);
    this.isDeveloperChkbx = new ReactiveVar(false);
    this.installerRoleChkbx = new ReactiveVar(false);
    this.adminRoleChkbx = new ReactiveVar(false);
    this.superuserRoleChkbx = new ReactiveVar(false);
    this.devInstallerRoleChkbx = new ReactiveVar(false);
    this.devAdminRoleChkbx = new ReactiveVar(false);
    this.devSuperuserRoleChkbx = new ReactiveVar(false);
    this.isDevRolesEnabled = new ReactiveVar(false);
    this.responseMsg = new ReactiveVar(null);
    this.arePasswordsSame = new ReactiveVar(null);
});

Template.addUserProfile.helpers({

    getAdmNumber: () => {
        return Template.instance().username.get();
    },

    getFirstName: () => {
        return Template.instance().firstName.get();
    },

    getLastName: () => {
        return Template.instance().lastName.get();
    },

    getEmail: () => {
        return Template.instance().email.get();
    },

    getPassword: () => {
        return Template.instance().password.get();
    },

    getConfirmPassword: () => {
        return Template.instance().confirmPassword.get();
    },

    isDeveloper: function() {
        if(Template.instance().isDeveloperChkbx.get() === true) {
            return 'checked';
        }
        return null;
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
    },

    isDevInstallerRole: () => {
        if(Template.instance().devInstallerRoleChkbx.get() === true) {
            return 'checked';
        }
        return null;
    },

    isDevAdminRole: () => {
        if(Template.instance().devAdminRoleChkbx.get() === true){
            return 'checked';
        }
        return null;
    },

    isDevSuperuserRole: () => {
        if(Template.instance().devSuperuserRoleChkbx.get() === true){
            return 'checked';
        }
        return null;
    },

    isDevRolesEnabled: () => {
        if(Template.instance().isDevRolesEnabled.get() === true){
            return '';
        }
        else {
            Template.instance().devInstallerRoleChkbx.set(false);
            Template.instance().devAdminRoleChkbx.set(false);
            Template.instance().devSuperuserRoleChkbx.set(false);
        }
        return  'disabled';
    },

    responseMsg: function() {
        return Template.instance().responseMsg.get();
    }
});

Template.addUserProfile.events({

    'change #adm': (event, template) => {
        event.preventDefault();
        let adm = $('#adm').val();
        template.username.set(adm);
        template.newUserProfile.get().profile.user.username = adm;
        console.log(template.newUserProfile.get());
    },

    'change #firstname': (event, template) => {
        event.preventDefault();
        let firstName = $('#firstname').val();
        console.log(firstName);
        template.firstName.set(firstName);
        template.newUserProfile.get().profile.userProfile.firstName = firstName;
    },

    'change #lastname': (event, template) => {
        event.preventDefault();
        let lastName = $('#lastname').val();
        console.log(lastName);
        template.lastName.set(lastName);
        template.newUserProfile.get().profile.userProfile.lastName = lastName;
    },

    'change #email': (event, template) => {
        event.preventDefault();
        let email = $('#email').val();
        console.log(email);
        template.email.set(email);
        template.newUserProfile.get().profile.user.emails = email
    },

    'change #password': (event, template) => {
        event.preventDefault();
        let pwd = $('#password').val();
        console.log(pwd);
        template.newUserProfile.get().profile.user.password = pwd;
    },

    'change #confirmPassword': (event, template) => {
        event.preventDefault();
        let pwd = template.newUserProfile.get().profile.user.password;
        let confpwd = $('#confirmPassword').val();
        console.log(confpwd);
        // let passwordsMatch = confpwd === pwd ? true: false;
        // template.arePasswordsSame.set(passwordsMatch);
        template.confirmPassword.set(confpwd);
    },


    'click #isDeveloperChkbx': (event, template) => {
        event.preventDefault();
        let isChecked = $('#isDeveloperChkbx').is(":checked");
        template.isDeveloperChkbx.set(isChecked);
        template.isDevRolesEnabled.set(isChecked);
        if(isChecked === false){
            template.newUserProfile.get().profile.devRoles = [];
        }
    },

    'click #addUserProfile': (event, template) => {
        event.preventDefault();
        console.log(JSON.stringify(template.newUserProfile.get()));
        let profile = template.newUserProfile.get();
        Meteor.call('createUserProfile', profile, function(err, res){
            if(err){
                template.responseMsg.set("Invalid Input.");
            }
            else {
                template.responseMsg.set(res);
            }
        });
    },

    'click #cancelAddUserProfile': (event, template) => {
        event.preventDefault();
        template.username.set('');
        template.firstName.set('');
        template.lastName.set('');
        template.email.set('');
        template.isDeveloperChkbx.set(false);
        template.password.set('');
        template.confirmPassword.set('');
        template.userProfile.set(getEmptyProfile());
    },

    'click #installerRoleChkbx': (event, template) => {
        event.preventDefault();
        console.log("installerRoleChkbx");
        let isChecked = $('#installerRoleChkbx').is(":checked");
        template.installerRoleChkbx.set(isChecked);
        addOrRemoveRole('Installer', isChecked, 'DTL', template);

    },

    'click #adminRoleChkbx': (event, template) => {
        event.preventDefault();
        console.log("adminRoleChkbx");
        let isChecked = $('#adminRoleChkbx').is(":checked");
        template.adminRoleChkbx.set(isChecked);
        addOrRemoveRole('Admin', isChecked, 'DTL', template);
    },

    'click #superuserRoleChkbx': (event, template) => {
        event.preventDefault();
        console.log("superuserRoleChkbx");
        let isChecked = $('#superuserRoleChkbx').is(":checked");
        template.superuserRoleChkbx.set(isChecked);
        addOrRemoveRole('SuperUser', isChecked, 'DTL', template);
    },

    'click #isDevInstallerChkbx': (event, template) => {
        event.preventDefault();
        console.log("isDevInstallerChkbx");
        let isChecked = $('#isDevInstallerChkbx').is(":checked");
        template.devInstallerRoleChkbx.set(isChecked);
        console.log("bbbb" + isChecked);
        addOrRemoveRole('Installer', isChecked, 'DEV', template);
    },

    'click #isDevAdminRoleChkbx': (event, template) => {
        event.preventDefault();
        console.log("devAdminRoleChkbx");
        let isChecked = $('#isDevAdminRoleChkbx').is(":checked");
        template.devAdminRoleChkbx.set(isChecked);
        addOrRemoveRole('Admin', isChecked, 'DEV', template);
    },

    'click #isDevSuperuserRoleChkbx': (event, template) => {
        event.preventDefault();
        console.log("devSuperuserRoleChkbx");
        let isChecked = $('#isDevSuperuserRoleChkbx').is(":checked");
        template.devSuperuserRoleChkbx.set(isChecked);
        addOrRemoveRole('SuperUser', isChecked, 'DEV', template);
    }

});

function getEmptyProfile(){
    let userProfile = {firstName: null, lastName: null};
    let user = {username: null, password: null, emails: null};
    let roles = {common: [], devRoles: []};
    return {profile:{user: user, userProfile: userProfile, userRoles: roles}};
}
//firstName: "James", lastName: "Brown", username: "adm1112", password: "12345678", email:"User1@hotmail.com", roles: [], group: agroup

function addOrRemoveRole(role, action, roleType, template){
    let userRoles = template.newUserProfile.get().profile.userRoles;
    if(action){
        if(roleType === 'DEV'){
            if(!_.contains(userRoles.devRoles, role)){
                userRoles.devRoles.push(role);
            }
        }
        else {
            if(!_.contains(userRoles.common, role)){
                userRoles.common.push(role);
            }
        }
    }
    else {
        if(roleType === 'DEV'){
            if(_.contains(userRoles.devRoles, role)){
                let pos = _.indexOf(userRoles.devRoles, role);
                userRoles.devRoles.splice(pos, 1);
            }
        }
        else {
            if(_.contains(userRoles.common, role)){
                let pos = _.indexOf(userRoles.common, role);
                userRoles.common.splice(pos, 1);
            }
        }
    }

    template.newUserProfile.get().profile.userRoles = userRoles;
    console.log(JSON.stringify(template.newUserProfile.get()));
}

function isValidAdm(adm){
    if(_.isString(adm)){
        return adm.length() === 7;
    }
    return false;
}
