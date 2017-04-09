/**
 * Created by adm9360 on 20/01/2017.
 */


Template.addUserProfile.onCreated(function(){

    Meteor.subscribe('EnvironmentTypes');
    this.userAccountGroups = new ReactiveVar(defaultGroups());
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
    this.prodInstallerRoleChkbx = new ReactiveVar(false);
    this.prodAdminRoleChkbx = new ReactiveVar(false);
    this.prodSuperuserRoleChkbx = new ReactiveVar(false);
    this.areDevRolesEnabled = new ReactiveVar(false);
    this.responseMsg = new ReactiveVar(null);

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

    envType: () => {
        return EnvironmentTypes.find({});
    },

    envTypeOption: (type) => {
        let isSelected = false;
        return {key: type, selected: isSelected ? 'selected' : '', value: type};
    },

    PrimaryEnv: function() {
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

    isProdInstaller: () => {
        if(Template.instance().prodInstallerRoleChkbx.get()){
            return 'checked';
        }
    },

    isProdAdmin: () => {
        if(Template.instance().prodAdminRoleChkbx.get()){
            return 'checked';
        }
    },

    isProdSuperuser: () => {
        if(Template.instance().prodSuperuserRoleChkbx.get()){
            return 'checked';
        }
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

/**
 * ONLY jquery's "keyup" event seems to work with Meteor events
 * The "keyup" event does not work if the browser suggests text, in these
 * cases the "change" event should be used.
 */
Template.addUserProfile.events({

    "change #adm": (event, template) => {
        event.preventDefault();
        let adm = $('#adm').val();
        template.username.set(adm);
        console.log(template.username.get());
    },

    "change #firstname": (event, template) => {
        event.preventDefault();
        let firstName = $('#firstname').val();
        console.log(firstName);
        template.firstName.set(firstName);
    },

    "change #lastname": (event, template) => {
        event.preventDefault();
        let lastName = $('#lastname').val();
        console.log(lastName);
        template.lastName.set(lastName);
    },

    "change #email": (event, template) => {
        event.preventDefault();
        let email = $('#email').val();
        console.log(email);
        template.email.set(email);
    },

    "change #password": (event, template) => {
        event.preventDefault();
        let pwd = $('#password').val();
        console.log(pwd);
        template.password.set(pwd);
    },

    "change #confirmPassword": (event, template) => {
        event.preventDefault();
        //let pwd = template.userGroups.get().password;
        let confpwd = $('#confirmPassword').val();
        console.log(confpwd);
        // let passwordsMatch = confpwd === pwd ? true: false;
        // template.arePasswordsSame.set(passwordsMatch);
        template.confirmPassword.set(confpwd);
    },


    "click #isDeveloperChkbx": (event, template) => {
        event.preventDefault();
        let isChecked = $('#isDeveloperChkbx').is(":checked");
        template.isDeveloperChkbx.set(isChecked);
        template.areDevRolesEnabled.set(isChecked);
        if(isChecked === false){
            template.userGroups.get().groups.DEV = [];
        }
    },


    "click #addUserProfile": (event, template) => {
        event.preventDefault();
        if(template.password.get() === template.confirmPassword.get()){
            if(template.password.get().length > 5){
                //I created this email regex myself.
                let regex =  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                //Test email is valid.
                if(regex.test(template.email.get())){
                    let userProfile = {
                        userName: template.username.get(),
                        password: template.password.get(),
                        confirmPassword: template.confirmPassword.get(),
                        email: template.email.get(),
                        firstName: template.firstName.get(),
                        lastName: template.lastName.get(),
                        groups: template.userAccountGroups.get().groups
                    }
                    console.log(JSON.stringify(profile));

                    Meteor.call('createUserProfile', profile, function(err, res){
                        if(err){
                            console.log(err);
                            template.responseMsg.set(err.error);
                        }
                        else {
                            console.log(res);
                            FlowRouter.go('userprofiles');
                        }
                    });
                }
                else {
                    template.responseMsg.set("Invalid Email Address.");
                }
            }
            else {
                template.responseMsg.set("Password must contian 5 characters.");
            }
        }
        else {
            template.responseMsg.set("Passwords do not match.");
        }
    },

    "click #cancelAddUserProfile": (event, template) => {
        event.preventDefault();
        template.username.set(null);
        template.firstName.set(null);
        template.lastName.set(null);
        template.email.set(null);
        template.password.set(null);
        template.confirmPassword.set(null);
        template.isDeveloperChkbx.set(false);
        template.areDevRolesEnabled.set(false);
        template.installerRoleChkbx.set(false);
        template.adminRoleChkbx.set(false);
        template.superuserRoleChkbx.set(false);
        template.userAccountGroups.set(defaultGroups());
    },

    "click #installerRoleChkbx": (event, template) => {
        event.preventDefault();
        console.log("installerRoleChkbx");
        let isChecked = $('#installerRoleChkbx').is(":checked");
        template.installerRoleChkbx.set(isChecked);
        addOrRemoveRole('Installer', isChecked, 'TEST', template);

    },

    "click #adminRoleChkbx": (event, template) => {
        event.preventDefault();
        console.log("adminRoleChkbx");
        let isChecked = $('#adminRoleChkbx').is(":checked");
        template.adminRoleChkbx.set(isChecked);
        addOrRemoveRole('Administrator', isChecked, 'TEST', template);
    },

    "click #superuserRoleChkbx": (event, template) => {
        event.preventDefault();
        console.log("superuserRoleChkbx");
        let isChecked = $('#superuserRoleChkbx').is(":checked");
        template.superuserRoleChkbx.set(isChecked);
        addOrRemoveRole('SuperUser', isChecked, 'TEST', template);
    },

    "click #isDevInstallerChkbx": (event, template) => {
        event.preventDefault();
        console.log("isDevInstallerChkbx");
        let isChecked = $('#isDevInstallerChkbx').is(":checked");
        template.devInstallerRoleChkbx.set(isChecked);
        addOrRemoveRole('Installer', isChecked, 'DEV', template);
    },

    "click #isDevAdminRoleChkbx": (event, template) => {
        event.preventDefault();
        console.log("devAdminRoleChkbx");
        let isChecked = $('#isDevAdminRoleChkbx').is(":checked");
        template.devAdminRoleChkbx.set(isChecked);
        addOrRemoveRole('Administrator', isChecked, 'DEV', template);
    },

    "click #isDevSuperuserRoleChkbx": (event, template) => {
        event.preventDefault();
        console.log("devSuperuserRoleChkbx");
        let isChecked = $('#isDevSuperuserRoleChkbx').is(":checked");
        template.devSuperuserRoleChkbx.set(isChecked);
        addOrRemoveRole('SuperUser', isChecked, 'DEV', template);
    }

});

function defaultGroups(){
    return {groups: {TEST: [], DEV: [], PROD: []}};
}

function addOrRemoveRole(role, action, roleType, template){
    let roles = template.userAccountGroups.get().groups;
    if(action){
        if(roleType === 'DEV'){
            if(!_.contains(roles.DEV, role)){
                roles.DEV.push(role);
            }
        }
        else {
            if(!_.contains(roles.TEST, role)){
                roles.TEST.push(role);
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
            if(_.contains(roles.TEST, role)){
                let pos = _.indexOf(roles.TEST, role);
                roles.TEST.splice(pos, 1);
            }
        }
    }

    console.log(JSON.stringify(template.userAccountGroups.get()));
}

function isValidAdm(adm){
    if(_.isString(adm)){
        return adm.length() === 7;
    }
    return false;
}
