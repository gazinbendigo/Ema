/**
 * Created by adm9360 on 20/01/2017.
 */

Template.addUserProfile.onCreated(function(){

    this.userProfile = new ReactiveVar(getEmptyProfile());
    this.admNumber = new ReactiveVar(null);
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
});

Template.addUserProfile.helpers({

    getAdmNumber: () => {
        return Template.instance().admNumber.get();
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
        console.log("abc");
        if(Template.instance().isDeveloperChkbx.get() === true) {
            return 'checked';
        }
        return null;
    },

    isNotDeveloper: () => {
        if(Template.instance().isNotDeveloperChkbx.get() === true) {
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
});

Template.addUserProfile.events({

    'keyup #adm': (event, template) => {
        event.preventDefault();
        let adm = $('#adm').val();
        template.admNumber.set(adm);
        updateUserProfile("adm", adm);
        console.log(adm);
    },

    'keyup #firstname': (event, template) => {
        event.preventDefault();
        let firstName = $('#firstname').val();
        console.log(firstName);
        template.firstName.set(firstName);
        updateUserProfile("firstName", firstName);
    },

    'keyup #lastname': (event, template) => {
        event.preventDefault();
        let lastName = $('#lastname').val();
        console.log(lastName);
        template.lastName.set(lastName);
        updateUserProfile("lastName", lastName);
    },

    'keyup #email': (event, template) => {
        event.preventDefault();
        let email = $('#email').val();
        console.log(email);
        template.email.set(email);
        updateUserProfile("email", email);
    },

    'keyup #password': (event, template) => {
        event.preventDefault();
        let pwd = $('#password').val();
        console.log(pwd);
        template.password.set(pwd);
        updateUserProfile("password", pwd);
    },

    'keyup #confirmPassword': (event, template) => {
        event.preventDefault();
        let confpwd = $('#confirmPassword').val();
        console.log(confpwd);
        template.confirmPassword.set(confpwd);
    },


    'click #isDeveloper': (event, template) => {
        event.preventDefault();
        template.isNotDeveloperChkbx.set(false);
        template.isDeveloperChkbx.set(true);
        updateUserProfile("team", 'D');
    },

    'click #isNotDeveloper': (event, template) => {
        event.preventDefault();
        template.isDeveloperChkbx.set(false);
        template.isNotDeveloperChkbx.set(true);
        updateUserProfile("team", 'O');
    },

    'click #submitProfile': (event, template) => {
        event.preventDefault();
        console.log("submitProfile");
        console.log(JSON.stringify(Template.instance().userProfile.get()));
    },

    'click #cancelProfile': (event, template) => {
        event.preventDefault();
        template.admNumber.set('');
        template.firstName.set('');
        template.lastName.set('');
        template.email.set('');
        template.isDeveloperChkbx.set(false);
        template.isNotDeveloperChkbx.set(false);
        template.password.set('');
        template.confirmPassword.set('');
        template.userProfile.set(getEmptyProfile());
    },

    'click #submitProfileRoles': (event, template) => {
        event.preventDefault();
        console.log("submitProfileRoles");
    },

    'click #cancelProfileRoles': (event, template) => {
        event.preventDefault();
        console.log("cancelProfileRoles");
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

function updateUserProfile(key, value){
    if(value){
        Template.instance().userProfile.get()[key] = value;
    }
    else {
        delete Template.instance().userProfile.get()[key];
    }
}

function getEmptyProfile(){
    return {adm: '', firstName: '', lastName: '', email: '', team: '', password: '', roles:{}};
}

function isValidAdm(adm){
    return adm.length() === 7;
}

