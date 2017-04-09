/**
 * Created by adm9360 on 25/08/2016.
 */
BrowserPolicy.content.allowOriginForAll("*.googleapis.com");
BrowserPolicy.content.allowOriginForAll("*.gstatic.com");
BrowserPolicy.content.allowOriginForAll("*.bootstrapcdn.com");

BrowserPolicy.content.allowFontDataUrl();


// Deny all client-side updates to user documents
Meteor.users.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});

// // Get a list of all accounts methods by running `Meteor.server.method_handlers` in meteor shell
// const AUTH_METHODS = [
//     'login',
//     'logout',
//     'logoutOtherClients',
//     'getNewToken',
//     'removeOtherTokens',
//     'configureLoginService',
//     'changePassword',
//     'forgotPassword',
//     'resetPassword',
//     'verifyEmail',
//     'createUser',
//     'ATRemoveService',
//     'ATCreateUserServer',
//     'ATResendVerificationEmail',
// ];
//
// // Only allow 2 login attempts per connection per 5 seconds
// DDPRateLimiter.addRule({
//     name(name) {
//         return _.contains(AUTH_METHODS, name);
//     },
//
//     // Rate limit per connection ID
//     connectionId() { return true; },
// }, 2, 5000);