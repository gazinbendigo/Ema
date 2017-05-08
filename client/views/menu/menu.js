/**
 * Created by adm9360 on 29/11/2016.
 */

"use strict";

Template.menu.helpers({
    homePage() {
        return FlowRouter.path("home");
    },

    consumerPropsParentPath() {
        return FlowRouter.path('manageConsumerProperties');
    },

    viewEnvironmentPath() {
        return FlowRouter.path('viewEnvironments');
    },

    createEnvironmentPath() {
        return FlowRouter.path('createEnvironment');
    },

    manageEnvironmentPath() {
        return FlowRouter.path('manageEnvironment');
    },

    configurationParentPath() {
        return FlowRouter.path('configuration');
    },

    performanceParentPath() {
        return FlowRouter.path('performance');
    },

    manageUsers() {
        return FlowRouter.path("userprofiles");
    },

    loginPath() {
        return FlowRouter.path("login");
    },

    addUserProfile() {
        return FlowRouter.path("addUserProfile");
    },

    listGroups(){
        return FlowRouter.path("listGroups")
    },

    manageGroup(){
        return FlowRouter.path("manageGroup");
    },

    addGroup(){
        return FlowRouter.path("addGroup")
    },

    listRoles(){
        return FlowRouter.path("listRoles")
    },

    manageRole(){
        return FlowRouter.path("manageRole")
    },

    addRole(){
        return FlowRouter.path("addRole")
    },

    isUserInRole() {

        return false;
    }
});

Template.menu.events({

    "click": function(event) { // Fix Bootstrap Dropdown Menu Collapse on click outside Menu
        var clickover = $(event.target).closest(".dropdown-toggle").length;
        var opened = $(".navbar-collapse").hasClass("in");
        if (opened === true && !clickover) {
            $('.navbar-collapse').collapse('hide');
        }
    },

    "keyup": function(event) {
        if (event.keyCode === 27) { // Bootstrap Dropdown Menu Collapse on ESC pressed
            var opened = $(".navbar-collapse").hasClass("in");
            if (opened === true) {
                $('.navbar-collapse').collapse('hide');
            }
        }
    },

    'click #logout': function(event){
        event.preventDefault();
        Meteor.logout();
        FlowRouter.go("/");
    }

});