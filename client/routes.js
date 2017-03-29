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