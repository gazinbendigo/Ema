/**
 * Created by holly on 10/11/16.
 */

Template.editUserProfile.onCreated(function() {
    let template = Template.instance();
    //template.subscribe("Users");
    Meteor.subscribe("UserGroups");
    let adm = FlowRouter.getParam("adm");
    console.log("Got adm: " + adm);
    let userProfile = null;
    //this.autorun(() => {
        userProfile = Meteor.users.findOne({username: adm});
    //});

    console.log(userProfile);

    //Object { _id: "Aiviyg9sLAerhcHW3", createdAt: Date 2017-02-11T22:49:36.829Z, services: Object, username: "adm1155", emails: Array[1], name: Object[1], profile: Object }
    //let profileToUpdate = {username: userProfile.username, password: '', email: userProfile.emails[0].address, firstName: userProfile.profile.firstName, lastName: userProfile.profile.lastName, groups: userProfile.profile.groups};

    this.userAccountGroups = new ReactiveVar(userProfile.profile.groups);
    console.log("Groups: " + template.userAccountGroups.get())
    console.log("Username: " + userProfile.username);
    console.log("Email: " + userProfile.emails[0].address);
    this.userName = new ReactiveVar(userProfile.username);
    this.firstName = new ReactiveVar(userProfile.profile.firstName);
    this.lastName = new ReactiveVar(userProfile.profile.lastName);
    this.email = new ReactiveVar(userProfile.emails[0].address);
    this.password = new ReactiveVar(null);
    this.confirmPassword = new ReactiveVar(null);
    let devRolesEnabled = userProfile.profile.groups.DEV.length > 0;
    this.isDeveloperChkbx = new ReactiveVar(devRolesEnabled);
    this.areDevRolesEnabled = new ReactiveVar(devRolesEnabled);
    this.devInstallerRoleChkbx = new ReactiveVar(false);
    this.devAdminRoleChkbx = new ReactiveVar(false);
    this.devSuperuserRoleChkbx = new ReactiveVar(false);
    if(devRolesEnabled){
        _.each(userProfile.profile.groups.DEV, function(role){
            if(role === 'Installer'){
                template.devInstallerRoleChkbx.set(true);
            }
            else if(role === 'Administrator'){
                template.devAdminRoleChkbx.set(true);
            }
            else if(role === 'SuperUser'){
                template.devSuperuserRoleChkbx.set(true);
            }
        });
    }
    this.installerRoleChkbx = new ReactiveVar();
    this.adminRoleChkbx = new ReactiveVar(false);
    this.superuserRoleChkbx = new ReactiveVar(false);
    _.each(userProfile.profile.groups.OTHER, function(role){
        if(role === 'Installer'){
            template.installerRoleChkbx.set(true);
        }
        else if(role === 'Administrator'){
            template.adminRoleChkbx.set(true);
        }
        else if(role === 'SuperUser'){
            template.superuserRoleChkbx.set(true);
        }
    });

    this.responseMsg = new ReactiveVar(null);

});

Template.editUserProfile.helpers({

    getUsername: () => {
        return Template.instance().userName.get();
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
        addOrRemoveRole('Administrator', isChecked, 'OTHER', template);
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
        addOrRemoveRole('Administrator', isChecked, 'DEV', template);
    },

    'click #isDevSuperuserRoleChkbx': (event, template) => {
        event.preventDefault();
        console.log("devSuperuserRoleChkbx");
        let isChecked = $('#isDevSuperuserRoleChkbx').is(":checked");
        template.devSuperuserRoleChkbx.set(isChecked);
        addOrRemoveRole('SuperUser', isChecked, 'DEV', template);
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
                groups: template.userAccountGroups.get()
            }
            Meteor.call('updateUser', userProfile, function(err, res){
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
    return {groups: {OTHER: [], DEV: []}};
}

function addOrRemoveRole(role, action, groupType, template){
    console.log(template.userAccountGroups.get());
    if(action){
        if(groupType === 'DEV'){
            if(!_.contains( template.userAccountGroups.get().DEV, role)){
                template.userAccountGroups.get().DEV.push(role);
            }
        }
        else {
            if(!_.contains( template.userAccountGroups.get().OTHER, role)){
                template.userAccountGroups.get().OTHER.push(role);
            }
        }
    }
    else {
        if(groupType === 'DEV'){
            if(_.contains( template.userAccountGroups.get().DEV, role)){
                let pos = _.indexOf( template.userAccountGroups.get().DEV, role);
                template.userAccountGroups.get().DEV.splice(pos, 1);
            }
        }
        else {
            if(_.contains( template.userAccountGroups.get().OTHER, role)){
                let pos = _.indexOf( template.userAccountGroups.get().OTHER, role);
                template.userAccountGroups.get().OTHER.splice(pos, 1);
            }
        }
    }

}



