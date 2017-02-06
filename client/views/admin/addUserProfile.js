/**
 * Created by adm9360 on 20/01/2017.
 */

const DEFAULT_TEAM = "OTHER";

Template.addUserProfile.onCreated(function(){

    this.newUserProfile = new ReactiveVar(getEmptyProfile());
    this.username = new ReactiveVar(null);
    this.firstName = new ReactiveVar(null);
    this.lastName = new ReactiveVar(null);
    this.email = new ReactiveVar(null);
    this.password = new ReactiveVar(null);
    this.confirmPassword = new ReactiveVar(null);
    this.isDeveloperChkbx = new ReactiveVar(false);
    this.isNotDeveloperChkbx = new ReactiveVar(false);
    this.installerRoleChkbx = new ReactiveVar(false);
    this.adminRoleChkbx = new ReactiveVar(false);
    this.superuserRoleChkbx = new ReactiveVar(false);
    this.devInstallerRoleChkbx = new ReactiveVar(false);
    this.devAdminRoleChkbx = new ReactiveVar(false);
    this.devSuperuserRoleChkbx = new ReactiveVar(false);
    this.isDevRolesEnabled = new ReactiveVar(false);
    this.errorMsg = new ReactiveVar(null);
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

    errorMsg: function() {
        return Template.instance().errorMsg.get();
    }
});

Template.addUserProfile.events({

    'keyup #adm': (event, template) => {
        event.preventDefault();
        let adm = $('#adm').val();
        template.username.set(adm);
        template.newUserProfile.get().profile.user.username = adm;
        console.log(template.newUserProfile.get());
    },

    'keyup #firstname': (event, template) => {
        event.preventDefault();
        let firstName = $('#firstname').val();
        console.log(firstName);
        template.firstName.set(firstName);
        template.newUserProfile.get().profile.userProfile.firstName = firstName;
    },

    'keyup #lastname': (event, template) => {
        event.preventDefault();
        let lastName = $('#lastname').val();
        console.log(lastName);
        template.lastName.set(lastName);
        template.newUserProfile.get().profile.userProfile.lastName = lastName;
    },

    'keyup #email': (event, template) => {
        event.preventDefault();
        let email = $('#email').val();
        console.log(email);
        template.email.set(email);
        template.newUserProfile.get().profile.user.emails = email
    },

    'keyup #password': (event, template) => {
        event.preventDefault();
        let pwd = $('#password').val();
        console.log(pwd);
        template.newUserProfile.get().profile.user.password = pwd;
    },

    'keyup #confirmPassword': (event, template) => {
        event.preventDefault();
        let pwd = template.newUserProfile.get().profile.user.passwrod;
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
        let team = isChecked == true ? "DEV":DEFAULT_TEAM;
        template.newUserProfile.get().profile.userProfile.team = team;
        if(isChecked === false){
            template.newUserProfile.get().profile.devRoles = [];
        }
    },

    'click #addUserProfile': (event, template) => {
        event.preventDefault();
        console.log(JSON.stringify(template.newUserProfile.get()));
        let profile = template.newUserProfile.get();
        Meteor.call('createUserProfile', profile, function(err, res){

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
        addOrRemoveRole('Installer', isChecked, false, template);

    },

    'click #adminRoleChkbx': (event, template) => {
        event.preventDefault();
        console.log("adminRoleChkbx");
        let isChecked = $('#adminRoleChkbx').is(":checked");
        template.adminRoleChkbx.set(isChecked);
        addOrRemoveRole('Admin', isChecked, false, template);
    },

    'click #superuserRoleChkbx': (event, template) => {
        event.preventDefault();
        console.log("superuserRoleChkbx");
        let isChecked = $('#superuserRoleChkbx').is(":checked");
        template.superuserRoleChkbx.set(isChecked);
        addOrRemoveRole('SuperUser', isChecked, false, template);
        addOrRemoveGroup(userGroups.SuperUser, isChecked, template);
    },

    'click #isDevInstallerChkbx': (event, template) => {
        event.preventDefault();
        console.log("isDevInstallerChkbx");
        let isChecked = $('#isDevInstallerChkbx').is(":checked");
        template.devInstallerRoleChkbx.set(isChecked);
        console.log("bbbb" + isChecked);
        addOrRemoveRole('Installer', isChecked, true, template);
    },

    'click #isDevAdminRoleChkbx': (event, template) => {
        event.preventDefault();
        console.log("devAdminRoleChkbx");
        let isChecked = $('#isDevAdminRoleChkbx').is(":checked");
        template.devAdminRoleChkbx.set(isChecked);
        addOrRemoveRole('Admin', isChecked, true, template);
    },

    'click #isDevSuperuserRoleChkbx': (event, template) => {
        event.preventDefault();
        console.log("devSuperuserRoleChkbx");
        let isChecked = $('#isDevSuperuserRoleChkbx').is(":checked");
        template.devSuperuserRoleChkbx.set(isChecked);
        addOrRemoveRole('SuperUser', isChecked, true, template);
    }

});

function getEmptyProfile(){
    let userProfile = {firstName: "hi", lastName: "", team: DEFAULT_TEAM, userGroup: []};
    let user = {username: "", password: "", emails: ""};
    let roles = [];
    let devRoles = [];
    return {profile:{user: user, userProfile: userProfile, userRoles: roles, developerRoles: devRoles}};
}

function addOrRemoveRole(role, action, isDevRole, template){
    let roles = [];
    if(isDevRole){
        roles = template.newUserProfile.get().profile.developerRoles.devRoles;
    }
    else {
        roles = template.newUserProfile.get().profile.userRoles.roles;
    }
    if(action){
        if(!_.contains(roles, role)){
            roles.push(role);
        }
    }
    else {
        if(_.contains(roles, role)){
            let pos = _.indexOf(roles, role);
            roles.splice(pos, 1);
        }
    }
    if(isDevRole){
        template.newUserProfile.get().profile.developerRoles.devRoles = roles;
    }
    else {
        template.newUserProfile.get().profile.userRoles.roles = roles;
    }
    console.log(JSON.stringify(template.newUserProfile.get()));
}


function addOrRemoveGroup(group, action, template){
    let groups = template.newUserProfile.get().profile.userProfile.userGroup;
    //If true add the group
    if(action){
        if(!_.contains(groups, group)){
            groups.push(group);
        }
    }
    else {
        if(_.contains(groups, group)){
            let pos = _.indexOf(groups, group);
            groups.splice(pos, 1);
        }
    }
    console.log(JSON.stringify(groups));
}

function isValidAdm(adm){
    if(_.isString(adm)){
        return adm.length() === 7;
    }
    return false;
}
