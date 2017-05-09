/**
 * Created by holly on 8/05/17.
 */

Template.listGroups.onCreated(function() {
    Meteor.subscribe("groups");
    this.groupItem = new ReactiveVar(null);
});

Template.listGroups.helpers({
    getGroups(){
        return Groups.find({});
    },

    groupUpadtePath(groupId) {
        let param = {id: groupId};
        return FlowRouter.path("manageGroup", param);
    },

    setGroupItem(id){
        console.log(id);
      Template.instance().groupItem.set(id);
    }
});

Template.listGroups.events({
    'click .groupItem': function(evt, template){
        evt.preventDefault();
        console.log(this.groupId);
        console.log(this._id);
    },

    'click .groupItemDelete': function(evt, template){
        evt.preventDefault();
        console.log(this.groupId);
    }
});