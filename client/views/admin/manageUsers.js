/**
 * Created by holly on 10/11/16.
 */

Template.manageUsers.onCreated(function(){
    let template = Template.instance();
    template.subscribe("Users");
    this.envRole = new ReactiveVar("default");

});

Template.manageUsers.helpers({
    getUsers: () => {
        //Do not show dummy users whose lastname is User
        let userType = Template.instance().envRole.get();
        if(userType !== "default"){
            return Meteor.users.find({"userProfile.userGroup": {"$eq": userType}});
        }
        else {
            return Meteor.users.find({"userProfile.lastName": {"$ne": 'User'}});
        }

        //Meteor.users.find({"userProfile.lastName": {"$ne": 'User'}});//Meteor.users.find({});
    },

    getUserRoles: () => {
        return null;
    },

    userProfilePath: (username) => {
        let param = {adm: username};
        return FlowRouter.path("updateUserProfile", param);
    }

});

Template.manageUsers.events({
    'change #selectedRole': (event, template) => {
        event.preventDefault();
        let selectedRole = $('#selectedRole').val();
        console.log(selectedRole);
        template.envRole.set(selectedRole);
    }
});