/**
 * Created by holly on 10/11/16.
 */

Template.editUserProfile.onCreated(function() {
    let template = Template.instance();
    //template.subscribe("Users");

    let adm = FlowRouter.getParam("adm");
    let profile = Meteor.users.findOne({username: adm});
    console.log(profile);

    let userProfile = {firstName: profile.userProfile.firstName, lastName: profile.userProfile.lastName};
    let user = {username: profile.username, password: null, email: null};
    let roles = {OTHER: profile.userProfile.groups.OTHER, DEV: profile.userProfile.groups.DEV};
    let updatedProfile = {profile:{user: user, userProfile: userProfile, userRoles: roles}};

    this.userProfile = new ReactiveVar(updatedProfile);

    this.username = new ReactiveVar(profile.username);
    this.firstName = new ReactiveVar(profile.userProfile.firstName);
    this.lastName = new ReactiveVar(profile.userProfile.lastName);
    this.email = new ReactiveVar('');
    this.password = new ReactiveVar(null);
    this.confirmPassword = new ReactiveVar(null);
    let devRolesEnabled = profile.userProfile.groups.DEV.length > 0;
    this.isDeveloperChkbx = new ReactiveVar(devRolesEnabled);
    this.areDevRolesEnabled = new ReactiveVar(devRolesEnabled);
    this.devInstallerRoleChkbx = new ReactiveVar(false);
    this.devAdminRoleChkbx = new ReactiveVar(false);
    this.devSuperuserRoleChkbx = new ReactiveVar(false);
    if(devRolesEnabled){
        _.each(profile.userProfile.groups.DEV, function(role){
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
    _.each(profile.userProfile.groups.OTHER, function(role){
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
        template.userProfile.get().username = adm;
        console.log(template.userProfile.get());
    },

    "change #firstname": (event, template) => {
        event.preventDefault();
        let firstName = $('#firstname').val();
        template.firstName.set(firstName);
        template.userProfile.get().userProfile.firstName = firstName;
        console.log(template.userProfile.get());
    },

    "change #lastname": (event, template) => {
        event.preventDefault();
        let lastname = $('#lastname').val();
        template.userProfile.get().userProfile.lastName = lastName;
        console.log(template.userProfile.get());
    },

    "change #email": (event, template) => {
        event.preventDefault();
        let email = $('#email').val();
        //template.userProfile.get().emails.[0].address = email;
        console.log(template.userProfile.get());
    },

    "change #password": (event, template) => {
        event.preventDefault();
        let password = $('#password').val();
        template.userProfile.get().userProfile.firstName = firstName;
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
    }
});


function addOrRemoveRole(role, action, roleType, template){
    let userRoles = template.userProfile.get().profile.userRoles;
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

    template.userProfile.get().profile.userRoles = userRoles;
    console.log(JSON.stringify(template.userProfile.get()));
}



