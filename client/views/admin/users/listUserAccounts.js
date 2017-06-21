/**
 * Created by holly on 10/11/16.
 */

//User Meteor.userId() and Meteor.user() on the client
//UserId is used to track login state throughout the App.

const NUMBER_OF_ROWS = 20;
const DEFAULT = 'default'

Template.listUserAccounts.onCreated(function(){
    Meteor.subscribe('Identities');//Template.instance().subscribe("identities");
    Meteor.subscribe("ApplicationRoles");
    Meteor.subscribe("groups");
    this.selectedRole = new ReactiveVar(DEFAULT);
    this.filterByUserType = new ReactiveVar(DEFAULT);
    this.advancedSearch = new ReactiveVar(null);
    this.responseMsg = new ReactiveVar(null);
    this.pageCursor = new ReactiveVar(0);
    this.rowCount = new ReactiveVar(NUMBER_OF_ROWS);

});

Template.listUserAccounts.helpers({

    getApplicationRoles() {
        return ApplicationRoles.find({});
    },

    getUsers() {

        let rowIndex = Number(Template.instance().pageCursor.get());
        let selectedRoll = Template.instance().selectedRole.get();
        let filterByUser = Template.instance().filterByUserType.get();
        let isAdvancedSearch = Template.instance().advancedSearch.get();
        let numberOfRows = Template.instance().rowCount;

        if(selectedRoll === DEFAULT && isAdvancedSearch === null && filterByUser === DEFAULT){
            numberOfRows.set(Meteor.users.find({}).count());
            return Meteor.users.find({}, {skip: rowIndex, limit: NUMBER_OF_ROWS});
        }
        else if(isAdvancedSearch != null){
            let cursor = Meteor.users.find(isAdvancedSearch);
            numberOfRows.set(cursor.count());
            return cursor;
        }
        else if(DEFAULT !== selectedRoll && DEFAULT === filterByUser){
            numberOfRows.set(Meteor.users.find({$or: [{'roles.DEV': selectedRoll}, {'roles.VMV': selectedRoll}, {'roles.DOM': selectedRoll}]}).count());
            return Meteor.users.find({$or: [{'roles.DEV': selectedRoll}, {'roles.VMV': selectedRoll}, {'roles.DOM': selectedRoll}]}, {skip: rowIndex, limit: NUMBER_OF_ROWS});
        }
        else if(selectedRoll !== DEFAULT && filterByUser !== DEFAULT){
            if(filterByUser === 'Developer'){
                numberOfRows.set(Meteor.users.find({$and: [{'identity.groupId': 1}, {'roles.DEV': selectedRoll}]}).count());
               return Meteor.users.find({$and: [{'identity.groupId': 1}, {'roles.DEV': selectedRoll}]}, {skip: rowIndex, limit: NUMBER_OF_ROWS});
            }
            else{
                numberOfRows.set(Meteor.users.find({$and: [{'identity.groupId': 2}, {'roles.DOM': selectedRoll}]}).count());
                return Meteor.users.find({$and: [{'identity.groupId': 2}, {'roles.DOM': selectedRoll}]}, {skip: rowIndex, limit: NUMBER_OF_ROWS});
            }
        }
        else {
            numberOfRows.set(Meteor.users.find({'identity.groupId': filterByUser}).count());
            return Meteor.users.find({'identity.groupId': filterByUser}, {skip: rowIndex, limit: NUMBER_OF_ROWS});
        }
    },

    getGroups(){
        return Groups.find({});
    },

    getGroupOptions(group){
       return {key: group.groupId, selected: false ? 'selected' : '', value: group.groupName};
    },

    getUserTypes() {
        return Meteor.users.find({});
    },


    userProfilePath(username) {
        let param = {adm: username};
        return FlowRouter.path("updateUserProfile", param);
    },

    responseMsg() {
        return Template.instance().responseMsg.get();
    },


    next() {
        let resultSetSize = Number(Template.instance().rowCount.get());
        let cursor = Number(Template.instance().pageCursor.get());
        if(resultSetSize < NUMBER_OF_ROWS){
            $(".next").css('visibility', 'hidden');
            return '';
        }
        else if((cursor + NUMBER_OF_ROWS) < resultSetSize){
            $(".next").css('visibility', 'visible');
            if((cursor + NUMBER_OF_ROWS * 2) > resultSetSize){
                let remainder = resultSetSize % (cursor + NUMBER_OF_ROWS);
                return "Next " + (cursor + NUMBER_OF_ROWS) + " - " + (cursor + NUMBER_OF_ROWS + remainder);
            }
            return "Next " + (cursor + NUMBER_OF_ROWS) + " - " + (cursor + NUMBER_OF_ROWS * 2);
        }
        else {
            $(".next").css('visibility', 'hidden');
            return '';
        }
     },

    prev() {
        let cursor = Number(Template.instance().pageCursor.get());
        if(cursor < NUMBER_OF_ROWS) {
            $(".prev").css('visibility', 'hidden');
            return '';
        }
        else {
            $(".prev").css('visibility', 'visible');
            return "Prev " + (cursor - NUMBER_OF_ROWS) + " - " + cursor;
        }
    },

});

Template.listUserAccounts.onRendered(function() {
    $(".prev").css('visibility', 'hidden');
});

/**
 *
 */
Template.listUserAccounts.events({
    'change #RoleSelector'(event, template) {
        event.preventDefault();
        let selected = $('#RoleSelector').val();
        template.selectedRole.set(selected);
        template.advancedSearch.set(null);
        template.pageCursor.set(0);
    },

    "change #roleFilter" (event, template) {
        event.preventDefault();
        let selected = $('#roleFilter').val();
        template.filterByUserType.set(selected);
        template.advancedSearch.set(null);
        template.pageCursor.set(0);
    },

    "click .prev"(event, template) {
        event.preventDefault();
        if(Number(template.pageCursor.get()) >  (NUMBER_OF_ROWS -1))
        {
            let pageCursor = Number(template.pageCursor.get()) - NUMBER_OF_ROWS;
            template.pageCursor.set(pageCursor);
        }
    },

    "click .next"(event, template) {
        event.preventDefault();
        let index = template.pageCursor.get();
            template.pageCursor.set((index + NUMBER_OF_ROWS));
    },

    'click #searchUserBttn'(event, template) {
        event.preventDefault();
        template.pageCursor.set(0);
        template.rowCount.set(0);
        let query = {};
        query['$or'] = [];
        if($('#adm').val().length > 0){
            ///////////////////////////////////////////////////////////////////////////////////////////////////////
            //The expression below says: Search for an adm like "?". The option i means to search by lowercase.

            query['$or'].push({username: {$regex: new RegExp('^' + $('#adm').val(), 'i')}});
        }
        if($('#firstName').val()){
            query['$or'].push({"profile.firstName": {$regex: new RegExp('^' + $('#firstName').val(), 'i')}});
        }
        if($('#lastName').val()){
            query['$or'].push({"profile.lastName": {$regex: new RegExp('^' + $('#lastName').val(), 'i')}});
        }

        if(query['$or'].length > 0){
            if(Meteor.users.find(query).count() > 0){
                template.advancedSearch.set(query);
                let fields = template.findAll("input[type=text]");
                _.each(fields, (field) => {
                    field.value = '';
                });
                template.responseMsg.set(null);
            }
            else {
                template.responseMsg.set("User not found.");
            }
        }
        else {
            template.responseMsg.set("User not found.");
        }
    },

    'click #clearBttn'(event, template) {
        event.preventDefault();
        let fields = template.findAll("input[type=text]");
        _.each(fields, (field) => {
            field.value = '';
        });
        template.find('#RoleSelector').value = DEFAULT;
        template.selectedRole.set(DEFAULT);
        template.advancedSearch.set(null);
        template.responseMsg.set(null);
        template.pageCursor.set(0);
        template.rowCount.set(NUMBER_OF_ROWS);
    }

});