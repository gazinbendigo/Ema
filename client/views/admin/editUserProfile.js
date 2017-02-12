/**
 * Created by holly on 10/11/16.
 */

Template.editUserProfile.onCreated(function() {
    let template = Template.instance();
    //template.subscribe("Users");

    let adm = FlowRouter.getParam("adm");
    console.log("Got adm: " + adm);
    let userProfile = null;
    this.autorun(() => {
        userProfile = Meteor.users.findOne({username: adm});
    });

    console.log(userProfile);

    //Object { _id: "Aiviyg9sLAerhcHW3", createdAt: Date 2017-02-11T22:49:36.829Z, services: Object, username: "adm1155", emails: Array[1], name: Object[1], profile: Object }
    let profileToUpdate = {profile:{username: userProfile.username, password: '', email: userProfile.emails[0].address, firstName: userProfile.profile.firstName, lastName: userProfile.profile.lastName, groups: userProfile.profile.groups}};

    this.userProfile = new ReactiveVar(profileToUpdate);
    console.log("Username: " + profileToUpdate.profile.username);
    console.log("FirstName: " + profileToUpdate.profile.email[0].address);
    this.username = new ReactiveVar(profileToUpdate.profile.username);
    this.firstName = new ReactiveVar(profileToUpdate.profile.firstName);
    this.lastName = new ReactiveVar(profileToUpdate.profile.lastName);
    this.email = new ReactiveVar(profileToUpdate.profile.email);
    this.password = new ReactiveVar(null);
    this.confirmPassword = new ReactiveVar(null);
    let devRolesEnabled = profileToUpdate.profile.groups.DEV.length > 0;
    this.isDeveloperChkbx = new ReactiveVar(devRolesEnabled);
    this.areDevRolesEnabled = new ReactiveVar(devRolesEnabled);
    this.devInstallerRoleChkbx = new ReactiveVar(false);
    this.devAdminRoleChkbx = new ReactiveVar(false);
    this.devSuperuserRoleChkbx = new ReactiveVar(false);
    if(devRolesEnabled){
        _.each(profileToUpdate.profile.groups.DEV, function(role){
            if(role === 'Installer'){
                template.devInstallerRoleChkbx.set(true);
            }
            else if(role === 'Administrator'){
                template.devAdminRoleChkbx.set(true);
            }
            else if(role === 'SuperUser'){
                template.devSuperuserRoleChkbx.set(true);
                console.log("boink");
            }
        });
    }
    this.installerRoleChkbx = new ReactiveVar();
    this.adminRoleChkbx = new ReactiveVar(false);
    this.superuserRoleChkbx = new ReactiveVar(false);
    _.each(profileToUpdate.profile.groups.OTHER, function(role){
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

    getUserProfile: function(){
        return Template.instance().userProfile.get();
    },

    getFirstName: () => {
        return Template.instance().userProfile.get().profile.firstName;
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
        console.log("blah");
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
});

Template.editUserProfile.events({

    "change #adm": function(event, template){
        event.preventDefault();
        let adm = $('#adm').val();
        template.username.set(adm);
        template.userProfile.get().profile.username = adm;
        console.log(template.userProfile.get());
    },

    "change #firstname": (event, template) => {
        event.preventDefault();
        let firstName = $('#firstname').val();
        template.firstName.set(firstName);
        template.userProfile.get().profile.firstName = firstName;
        console.log(template.userProfile.get());
    },

    "change #lastname": (event, template) => {
        event.preventDefault();
        let lastName = $('#lastname').val();
        template.userProfile.get().profile.lastName = lastName;
        console.log(template.userProfile.get());
    },

    "change #email": (event, template) => {
        event.preventDefault();
        let email = $('#email').val();
        template.userProfile.get().profile.email = email;
        console.log(template.userProfile.get());
    },

    "change #password": (event, template) => {
        event.preventDefault();
        let password = $('#password').val();
        template.userProfile.get().profile.password = password;
        console.log(template.userProfile.get());
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
        console.log(template.userProfile.get()._id);
        Meteor.call('deleteUser', template.userProfile.get()._id, function(err, res){
           if(!err){
               FlowRouter.go("userprofiles");
           }
           else {
               console.log(err);
           }
        });
    },

    'click #installerRoleChkbx': (event, template) => {
        event.preventDefault();
        console.log("installerRoleChkbx");
        let isChecked = $('#installerRoleChkbx').is(":checked");
        template.installerRoleChkbx.set(isChecked);
        addOrRemoveRole('Admin', isChecked, 'OTHER', template);
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
    },

    'click #updateProfile': (event, template) => {
        event.preventDefault();
        Meteor.call('updateUser', template.userProfile.get(), function(err, res){
           if(err){
               console.log(err);
           }
           else {
               console.log("succcess");
           }
        });
    }
});


function addOrRemoveRole(role, action, roleType, template){
    let userRoles = template.userProfile.get().profile.groups;
    if(action){
        if(roleType === 'DEV'){
            if(!_.contains(userRoles.DEV, role)){
                userRoles.DEV.push(role);
            }
        }
        else {
            if(!_.contains(userRoles.common, role)){
                userRoles.OTHER.push(role);
            }
        }
    }
    else {
        if(roleType === 'DEV'){
            if(_.contains(userRoles.DEV, role)){
                let pos = _.indexOf(userRoles.DEV, role);
                userRoles.DEV.splice(pos, 1);
            }
        }
        else {
            if(_.contains(userRoles.common, role)){
                let pos = _.indexOf(userRoles.common, role);
                userRoles.OTHER.splice(pos, 1);
            }
        }
    }

    template.userProfile.get().profile.groups = userRoles;
    console.log(JSON.stringify(template.userProfile.get()));
}



