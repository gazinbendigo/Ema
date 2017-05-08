/**
 * Created by adm9360_a on 17/03/2017.
 */

BlazeLayout.setRoot('body');

FlowRouter.route('/', {
    name: "home",
    action: () => {
        BlazeLayout.render("hubLogsLayout", {content: "hubLogsView", menu: 'menu'});
    }
});





FlowRouter.route('/signin',{
    name: 'login',
    action: () => {
        BlazeLayout.render("baseLayout", {content: "signin", menu: 'menu'});
    }
});

FlowRouter.route( '/userprofiles', {
    name: 'userprofiles',
    action: () => {
        BlazeLayout.render("baseLayout", {content: "manageUsers", menu: "menu"});
    }
});

FlowRouter.route('/profile/:adm', {
    name: 'updateUserProfile',
    //triggersEnter: [AccountsTemplates.ensureSignedIn],
    action: () => {
        BlazeLayout.render("baseLayout", {content: "editUserProfile", menu: "menu"});
    }
});

FlowRouter.route('/addUserProfile', {
    name: "addUserProfile",
    action: () => {
        BlazeLayout.render("baseLayout", {content: "addUserProfile", menu: "menu"});
    }
});

FlowRouter.route('/landing', {
    name: 'landing',
    action: function(){
        BlazeLayout.render("baseLayout", {content: "landing", menu: 'menu'});
    }
});

FlowRouter.route('/manage/groups', {
    name: 'listGroups',
    action: function() {
        BlazeLayout.render("baseLayout", {content: "listGroups", menu: 'menu'});
    }
});

FlowRouter.route('/manage/group/:id', {
    name: 'manageGroup',
    action: function() {
        BlazeLayout.render("baseLayout", {content: "manageGroup", menu: 'menu'});
    }
});

FlowRouter.route('/manage/group', {
    name: 'addGroup',
    action: function() {
        BlazeLayout.render("baseLayout", {content: "addGroup", menu: 'menu'});
    }
});

FlowRouter.route('/manage/roles', {
    name: 'listRoles',
    action: function() {
        BlazeLayout.render("baseLayout", {content: "listRoles", menu: 'menu'});
    }
});

FlowRouter.route('/manage/role/:id', {
    name: 'manageRole',
    action: function() {
        BlazeLayout.render("baseLayout", {content: "manageRole", menu: 'menu'});
    }
});

FlowRouter.route('/manage/role', {
    name: 'addRole',
    action: function() {
        BlazeLayout.render("baseLayout", {content: "addRole", menu: 'menu'});
    }
});



FlowRouter.notFound = {
    action: () => {
        BlazeLayout.render("baseLayout", {content: "notFound", menu: "menu"});
    }
}



////////////////////////////////////////////////////////
// Sample style page

FlowRouter.route('/spacebars', {
    name: 'spacebars',
    action: () => {
        BlazeLayout.render("baseLayout", {content: "spacebars"});
    }
});