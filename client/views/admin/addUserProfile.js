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
    this.areDevRolesEnabled = new ReactiveVar(false);
    this.responseMsg = new ReactiveVar(null);
    this.arePasswordsSame = new ReactiveVar(null);
});

Template.addUserProfile.helpers({

    getAdmNumber: () => {
        return Template.instance().newUserProfile.get().profile.username;
    },

    getFirstName: () => {
        return Template.instance().newUserProfile.get().profile.firstName;
    },

    getLastName: () => {
        return Template.instance().newUserProfile.get().profile.lastName;
    },

    getEmail: () => {
        return Template.instance().newUserProfile.get().profile.email;
    },

    getPassword: () => {
        return Template.instance().newUserProfile.get().profile.password;
    },

    getConfirmPassword: () => {
        return Template.instance().newUserProfile.get().profile.confirmPassword;
    },

    isDeveloper: function() {
        if(Template.instance().isDeveloperChkbx.get() === true) {
            return 'checked';
        }
        return null;
    },

    isInstaller: function(){
        if(Template.instance().installerRoleChkbx.get() === true){
            return 'checked';
        }
        return null;
    },

    isAdmin: function(){
        if(Template.instance().adminRoleChkbx.get() === true){
            return 'checked';
        }
        return null;
    },

    isSuperuser: function(){
        if(Template.instance().superuserRoleChkbx.get() === true){
            return 'checked';
        }
        return null;
    },

    isDevInstaller: () => {
        if(Template.instance().devInstallerRoleChkbx.get() === true) {
            return 'checked';
        }
        return null;
    },

    isDevAdmin: () => {
        if(Template.instance().devAdminRoleChkbx.get() === true){
            return 'checked';
        }
        return null;
    },

    isDevSuperuser: () => {
        if(Template.instance().devSuperuserRoleChkbx.get() === true){
            return 'checked';
        }
        return null;
    },

    areDevRolesEnabled: () => {
        if(Template.instance().areDevRolesEnabled.get() === true){
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
        template.newUserProfile.get().profile.username = adm;
        console.log(template.newUserProfile.get());
    },

    'change #firstname': (event, template) => {
        event.preventDefault();
        let firstName = $('#firstname').val();
        console.log(firstName);
        template.newUserProfile.get().profile.firstName = firstName;
    },

    'change #lastname': (event, template) => {
        event.preventDefault();
        let lastName = $('#lastname').val();
        console.log(lastName);
        template.newUserProfile.get().profile.lastName = lastName;
    },

    'change #email': (event, template) => {
        event.preventDefault();
        let email = $('#email').val();
        console.log(email);
        template.newUserProfile.get().profile.email = email
    },

    'change #password': (event, template) => {
        event.preventDefault();
        let pwd = $('#password').val();
        console.log(pwd);
        template.newUserProfile.get().profile.password = pwd;
    },

    'change #confirmPassword': (event, template) => {
        event.preventDefault();
        let pwd = template.newUserProfile.get().profile.password;
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
        template.areDevRolesEnabled.set(isChecked);
        if(isChecked === false){
            template.newUserProfile.get().profile.groups.DEV = [];
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
                FlowRouter.go('/userprofiles');
                //template.responseMsg.set(res);
            }
        });
    },

    'click #cancelAddUserProfile': (event, template) => {
        event.preventDefault();
        // template.username.set('');
        // template.firstName.set('');
        // template.lastName.set('');
        // template.email.set('');
        template.isDeveloperChkbx.set(false);
        // template.password.set('');
        // template.confirmPassword.set('');
        template.userProfile.set(getEmptyProfile());
    },

    'click #installerRoleChkbx': (event, template) => {
        event.preventDefault();
        console.log("installerRoleChkbx");
        let isChecked = $('#installerRoleChkbx').is(":checked");
        template.installerRoleChkbx.set(isChecked);
        addOrRemoveRole('Installer', isChecked, 'OTHER', template);

    },

    'click #adminRoleChkbx': (event, template) => {
        event.preventDefault();
        console.log("adminRoleChkbx");
        let isChecked = $('#adminRoleChkbx').is(":checked");
        template.adminRoleChkbx.set(isChecked);
        addOrRemoveRole('Admin', isChecked, 'OTHER', template);
    },

    'click #superuserRoleChkbx': (event, template) => {
        event.preventDefault();
        console.log("superuserRoleChkbx");
        let isChecked = $('#superuserRoleChkbx').is(":checked");
        template.superuserRoleChkbx.set(isChecked);
        addOrRemoveRole('SuperUser', isChecked, 'OTHER', template);
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
    // let userProfile = {firstName: null, lastName: null, groups: {OTHER: [], DEV: []}};
    // let user = {username: null, password: null, email: null};
    return {profile:{username: userProfile.username, password: '', email: userProfile.emails[0].address, firstName: userProfile.profile.firstName, lastName: userProfile.profile.lastName, groups: userProfile.profile.groups}};
}

function addOrRemoveRole(role, action, roleType, template){
    let roles = template.newUserProfile.get().profile.groups;
    if(action){
        if(roleType === 'DEV'){
            if(!_.contains(roles.DEV, role)){
                roles.DEV.push(role);
            }
        }
        else {
            if(!_.contains(roles.OTHER, role)){
                roles.OTHER.push(role);
            }
        }
    }
    else {
        if(roleType === 'DEV'){
            if(_.contains(roles.DEV, role)){
                let pos = _.indexOf(roles.DEV, role);
                roles.DEV.splice(pos, 1);
            }
        }
        else {
            if(_.contains(roles.OTHER, role)){
                let pos = _.indexOf(roles.OTHER, role);
                roles.OTHER.splice(pos, 1);
            }
        }
    }

    //template.newUserProfile.get().profile.userRoles = roles;
    console.log(JSON.stringify(template.newUserProfile.get()));
}

function isValidAdm(adm){
    if(_.isString(adm)){
        return adm.length() === 7;
    }
    return false;
}
