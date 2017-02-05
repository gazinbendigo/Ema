/**
 * Created by adm9360 on 10/12/2015.
 */

BlazeLayout.setRoot('body');
// if (Meteor.isClient) {
//     FlowRouter.wait();
//     Tracker.autorun(function() {
//         if (Roles.subscription.ready() && AccountsTemplates._initialized && !FlowRouter._initialized) {
//             FlowRouter.initialize()
//         }
//     });
// }



const authenticatedRoutes = FlowRouter.group({
    name: 'authenticated'
});

FlowRouter.route('/', {
    name: 'home',
    action: function() {
        BlazeLayout.render("hubLogsLayout", {content: "hubLogsView", menu: 'menu'});
    }
});

FlowRouter.route('/chart', {
    name: 'chart',
    action: function() {
        BlazeLayout.render('chart')
    }
});

FlowRouter.route('/searchHublogs', {
    name: 'searchHublogs',
    action: function() {
        BlazeLayout.render("hubLogsLayout", {content: "hubLogsView", menu: 'menu'})
    }
});

FlowRouter.route('/:env/requestservices/requestId/:requestId', {
    name: 'requestServiceAveragesByRequestId',
    action: function(params) {
        BlazeLayout.render("baseLayout", {content: "servicePerformanceView", menu: 'menu'});
    }
});

FlowRouter.route('/environments', {
    name: 'viewEnvironments',
    action: function(){
        BlazeLayout.render("baseLayout", {content: "viewEnvironment", menu: 'menu'});
    }
});

FlowRouter.route('/create-environment',{
    name: 'createEnvironment',
    action: function(){
        BlazeLayout.render("baseLayout", {content: "createEnvironment", menu: 'menu'});
    }
});

FlowRouter.route('/manageEnvironment', {
    name: 'manageEnvironment',
    action: function(){
        BlazeLayout.render("baseLayout", {content: "manageEnvironment", menu: 'menu'});
    }
});

FlowRouter.route('/environment/consumers',{
    name: 'manageConsumerProperties',
    action: function(){
        BlazeLayout.render("baseLayout", {content: "manageConsumerProperties", menu: 'menu'});
    }
});


FlowRouter.route('/performance', {
    name: 'performance',
    action: function () {
        BlazeLayout.render("baseLayout", {content: "performance", menu: "menu"});
    }
});

FlowRouter.route('/configuration', {
    name: 'configuration',
    action: function () {
        BlazeLayout.render("baseLayout", {content: "configuration", menu: "menu"});
    }
});


//TODO: Change to private
FlowRouter.route( '/userprofiles', {
    name: 'userprofiles',
    action() {
        BlazeLayout.render("baseLayout", {content: "manageUsers", menu: "menu"});
    }
});

//TODO: Change to private
FlowRouter.route('/userProfile/:adm', {
    name: 'updateUserProfile',
    action(){
        BlazeLayout.render("baseLayout", {content: "editUserProfile", menu: "menu"});
    }
});

FlowRouter.route('/addUserProfile', {
    name: 'addUserProfile',
    action(){
        BlazeLayout.render("baseLayout", {content: "addUserProfile", menu: "menu"});
    }
});

FlowRouter.route('/error', {
    name: 'error',
    action: function () {
        BlazeLayout.render("baseLayout", {content: "error", menu: "menu"});
    }
});

FlowRouter.notFound = {
    action: function () {
        BlazeLayout.render("noHeaderLayout", {content: "notFound"});
    }
}

FlowRouter.route('/signin',{
    name: 'login',
    action: function () {
        BlazeLayout.render("baseLayout", {content: "signin", menu: 'menu'});
    }
});

/////////// MOCK UPS  ///////////
FlowRouter.route('/mockHome', {
    name: 'mockHome',
    action: function() {
        BlazeLayout.render("hubLogsLayout", {content: "mockHome", menu: "menu"});
    }
});


FlowRouter.route('/spacebars', {
    name: 'spacebars',
    action: function() {
        BlazeLayout.render("baseLayout", {content: "spacebars"});
    }
});

