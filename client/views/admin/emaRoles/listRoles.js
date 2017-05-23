/**
 * Created by holly on 8/05/17.
 */

Template.listRoles.onCreated(function() {
  Meteor.subscribe("emaRoles");
});

Template.listRoles.helpers({
    getRoles() {
        return EmaRoles.find({});
    },

    roleUpadtePath(roleId) {
        let param = {id: roleId};
        return FlowRouter.path("manageRole", param);
    },
});

Template.listRoles.events({
    //EmaRoles.insert({roleId: 1, roleName: "Installer", roleDesc: "Installs applications"});
});