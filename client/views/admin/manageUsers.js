/**
 * Created by holly on 10/11/16.
 */

//User Meteor.userId() and Meteor.user() on the client
//UserId is used to track login state throughout the App.

const NUMBER_OR_ROWS = 20;

Template.manageUsers.onCreated(function(){
    Meteor.subscribe('Identities');//Template.instance().subscribe("identities");
    this.groupOptions = new ReactiveVar("default");
    this.advancedSearch = new ReactiveVar(null);
    this.responseMsg = new ReactiveVar(null);
    this.pageCursor = new ReactiveVar(0);
    this.nextPage = new ReactiveVar(0);
    this.prevPage = new ReactiveVar(0);

});

Template.manageUsers.helpers({

    getUsers() {
        let cursor = Number(Template.instance().pageCursor.get());
        if(Template.instance().groupOptions.get() === "default" && Template.instance().advancedSearch.get() === null){
            return Meteor.users.find({}, {skip: cursor, limit: NUMBER_OR_ROWS});
        }
        else if(Template.instance().advancedSearch.get() != null){
            return Meteor.users.find(Template.instance().advancedSearch.get());
        }
        else {
            return Meteor.users.find({$or: [{"identity.userType": Template.instance().groupOptions.get()}, {"identity.userType": Template.instance().groupOptions.get()}]}, {skip: cursor, limit: NUMBER_OR_ROWS});
        }
    },

    getUserTypes() {
        return Meteor.users.find({});
    },

    ugOptionsValue(group) {
        return {key: group, selected: false ? 'selected' : '', value: group};
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
        if(Meteor.users.find({}).count() > NUMBER_OR_ROWS){
            if((Number(Template.instance().pageCursor.get()) + NUMBER_OR_ROWS) <= Meteor.users.find({}).count()){
                $(".next").css('visibility', 'visible');
                return "Next " + (Number(Template.instance().pageCursor.get()) +  NUMBER_OR_ROWS) + " - "
                    + (Number(Template.instance().pageCursor.get()) + NUMBER_OR_ROWS * 2);
            }
            else {
                $(".next").css('visibility', 'hidden');
                return '';
            }
        }
    },

    prev() {
        if(Meteor.users.find({}).count() > NUMBER_OR_ROWS){
            if(Number(Template.instance().pageCursor.get()) < NUMBER_OR_ROWS) {
                $(".prev").css('visibility', 'hidden');
                return '';
            }
            else {
                $(".prev").css('visibility', 'visible');
                return "Prev " + (Number(Template.instance().pageCursor.get()) - NUMBER_OR_ROWS) + " - "
                    + (Number(Template.instance().pageCursor.get()));
            }
        }
    },

});

/**
 *
 */
Template.manageUsers.events({
    'change #GroupSelector'(event, template) {
        event.preventDefault();
        let selectedGroup = $('#GroupSelector').val();
        template.groupOptions.set(selectedGroup);
        template.advancedSearch.set(null);
    },

    "click .prev"(event, template) {
        event.preventDefault();
        if(Number(template.pageCursor.get()) >  19)
        {
            let pageCursor = Number(template.pageCursor.get()) - NUMBER_OR_ROWS;
            template.prevPage.set(pageCursor);
            template.pageCursor.set(pageCursor);
        }
    },

    "click .next"(event, template) {
        event.preventDefault();
        let index = template.pageCursor.get();
        template.pageCursor.set((index + NUMBER_OR_ROWS));

    },

    'click #searchUserBttn'(event, template) {
        event.preventDefault();
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
        template.find('#GroupSelector').value = "default";
        template.groupOptions.set("default");
        template.advancedSearch.set(null);
        template.responseMsg.set(null);
    }

});