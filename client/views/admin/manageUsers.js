/**
 * Created by holly on 10/11/16.
 */

Template.manageUsers.onCreated(function(){
    let template = Template.instance();
    template.subscribe("Users");

});

Template.manageUsers.helpers({
    getUsers: () => {
        return Users.find({});
    },

    getUserRoles: () => {
        return null;
    },

    userProfilePath: (adm) => {
        let param = {adm: adm};
        return FlowRouter.path("editUserProfile", param);
    }

});

Template.manageUsers.events({

});