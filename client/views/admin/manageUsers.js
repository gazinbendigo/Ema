/**
 * Created by holly on 10/11/16.
 */

//User Meteor.userId() and Meteor.user() on the client
//UserId is used to track login state throughout the App.

const NUMBER_OF_ROWS = 20;
const DEFAULT = 'default'

Template.manageUsers.onCreated(function(){
    Meteor.subscribe('Identities');//Template.instance().subscribe("identities");
    Meteor.subscribe("ApplicationRoles");
    this.selectedRole = new ReactiveVar(DEFAULT);
    this.filterByUserType = new ReactiveVar(DEFAULT);
    this.advancedSearch = new ReactiveVar(null);
    this.responseMsg = new ReactiveVar(null);
    this.pageCursor = new ReactiveVar(0);
    this.rowCount = new ReactiveVar(NUMBER_OF_ROWS);

});

Template.manageUsers.helpers({

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
               return Meteor.users.find({$and: [{'identity.userType': "Developer"}, {'roles.DEV': selectedRoll}]}, {skip: rowIndex, limit: NUMBER_OF_ROWS});
            }
            else{
                return Meteor.users.find({$and: [{'identity.userType': "Domain"}, {'roles.DOM': selectedRoll}]}, {skip: rowIndex, limit: NUMBER_OF_ROWS});
            }
        }
        else {
            return Meteor.users.find({'identity.userType': filterByUser}, {skip: rowIndex, limit: NUMBER_OF_ROWS});
        }
    },

    getUserTypes() {
        return Meteor.users.find({});
    },

    getAppRolesOptions(role){
        return {key: role.name, selected: false ? 'selected' : '', value: role.description};
    },

    userProfilePath(username) {
        let param = {adm: username};
        return FlowRouter.path("updateUserProfile", param);
    },

    responseMsg() {
        return Template.instance().responseMsg.get();
    },

    //Revist this page: https://www.discovermeteor.com/blog/template-level-subscriptions/
    next() {
        let numberOfRows = Template.instance().rowCount.get();
        if(numberOfRows < NUMBER_OF_ROWS){
            $(".next").css('visibility', 'hidden');
            return '';
        }
        else if(numberOfRows < ((Number(Template.instance().pageCursor.get()) + NUMBER_OF_ROWS * 2))){
            console.log('a');
            $(".next").css('visibility', 'visible');
            return "Next " + (Number(Template.instance().pageCursor.get()) + NUMBER_OF_ROWS) + " - "
                + numberOfRows;
        }
        else {
            console.log('b');
            console.log(numberOfRows);
            $(".next").css('visibility', 'visible');
            return "Next " + (Number(Template.instance().pageCursor.get()) +  NUMBER_OF_ROWS) + " - "
                + (Number(Template.instance().pageCursor.get()) + NUMBER_OF_ROWS * 2);
        }
        // else {
        //     let numberOfUsers = Meteor.users.find({}).count();
        //     if(numberOfUsers > NUMBER_OF_ROWS){
        //         if((Number(Template.instance().pageCursor.get()) + NUMBER_OF_ROWS) <= numberOfUsers){
        //             $(".next").css('visibility', 'visible');
        //             return "Next " + (Number(Template.instance().pageCursor.get()) +  NUMBER_OF_ROWS) + " - "
        //                 + (Number(Template.instance().pageCursor.get()) + NUMBER_OF_ROWS * 2);
        //         }
        //         else {
        //             $(".next").css('visibility', 'hidden');
        //             return '';
        //         }
        //     }
        //     else {
        //         $(".next").css('visibility', 'hidden');
        //         return '';
        //     }
        // }
    },

    prev() {
        if(Number(Template.instance().pageCursor.get()) < NUMBER_OF_ROWS) {
            $(".prev").css('visibility', 'hidden');
            return '';
        }
        else {
            $(".prev").css('visibility', 'visible');
            return "Prev " + (Number(Template.instance().pageCursor.get()) - NUMBER_OF_ROWS) + " - "
                + (Number(Template.instance().pageCursor.get()));
        }
    },

});

Template.manageUsers.onRendered(function() {
    $(".prev").css('visibility', 'hidden');
});

/**
 *
 */
Template.manageUsers.events({
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
        template.pageCursor.set(0);
    },

    "click .prev"(event, template) {
        event.preventDefault();
        if(Number(template.pageCursor.get()) >  19)
        {
            let pageCursor = Number(template.pageCursor.get()) - NUMBER_OF_ROWS;
            template.pageCursor.set(pageCursor);
        }
    },

    "click .next"(event, template) {
        event.preventDefault();
        let index = template.pageCursor.get();
        //if(template.rowCount.get() < (index + NUMBER_OF_ROWS * 2)){
            template.pageCursor.set((index + NUMBER_OF_ROWS));
        // }
        // else {
        //     template.pageCursor.set(template.rowCount.get());
        // }

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