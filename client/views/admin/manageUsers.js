/**
 * Created by holly on 10/11/16.
 */

//User Meteor.userId() and Meteor.user() on the client
//UserId is used to track login state throughout the App.

Template.manageUsers.onCreated(function(){
    Meteor.subscribe('Users');
    this.groupOptions = new ReactiveVar("default");
    Meteor.subscribe("UserGroups");
});

Template.manageUsers.helpers({

    getUsers: () => {
        if(Template.instance().groupOptions.get() === "default"){
            return Meteor.users.find({});
        }
        else {
            return Meteor.users.find({$or: [{"profile.groups.DEV": Template.instance().groupOptions.get()}, {"profile.groups.OTHER": Template.instance().groupOptions.get()}]});
        }
    },

    getUserGroups: () => {
        return UserGroups.find({});
    },

    ugOptionsValue: (group) => {
        return {key: group, selected: false ? 'selected' : '', value: group};
    },

    userProfilePath: (username) => {
        let param = {adm: username};
        return FlowRouter.path("updateUserProfile", param);
    }

});

Template.manageUsers.events({
    'change #GroupSelector': (event, template) => {
        event.preventDefault();
        let selectedGroup = $('#GroupSelector').val();
        template.groupOptions.set(selectedGroup);
    }
});