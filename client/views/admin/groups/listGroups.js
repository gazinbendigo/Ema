/**
 * Created by holly on 8/05/17.
 */

Template.listGroups.onCreated(function() {
    Meteor.subscribe("groups");
});

Template.listGroups.helpers({
    getGroups(){
        return Groups.find({});
    },

    groupUpadtePath(groupId) {
        let param = {id: groupId};
        return FlowRouter.path("manageGroup", param);
    }
});

Template.listGroups.events({

});