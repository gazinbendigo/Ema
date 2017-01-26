var cache = Npm.require('memory-cache');
// Register login handler with Meteor
// Pass in the user object created from reading the ADFS headers
// @param {Object} adfsUser contains ADM, Name, Email
Accounts.registerLoginHandler("adfs", function (options) {
    if (options.type !== 'adfs') {
        return undefined;
    }

    let userInfo = cache.get(options.id);

    // If "ADM" doesn't exist in the adfsUser, we don't have the correct item
    if (!userInfo) {
        return undefined;
    }

    cache.del(options.id);

    userInfo.id = userInfo.samaccountname;

    return Accounts.updateOrCreateUserFromExternalService('adfs', userInfo);
});

WebApp.connectHandlers.use((req, res, next) => {
    let authHeader = req.headers['x-bmd-user-attributes'],
        authentication,
        authenticated = false;

    if (authHeader) {
        authentication = parseAuth(authHeader);
    } else if(!Meteor.settings.adfsUrl) {
        // There is no user headers here - so use a dev account
        // TODO: Remove dev user and redirect to adfs if no header
        authentication = Meteor.settings.adfsDevUser;
        console.log('User does not have correct headers.')
    }

    if(authentication) {
        authenticated = _.isString(authentication.samaccountname);

        if(authenticated) {
            let id = Random.id();

            cache.put(id, authentication); // 10 seconds
            Inject.meta('adfs-auth', id, res);
        }
    }

    if (!authenticated) {
        res.writeHead(301, {
            'Location': Meteor.settings.adfsUrl
        });
        res.end();
        return;
    }

    next();
});

function parseAuth(headerVal) {
    try {
        return JSON.parse(decodeURIComponent(headerVal))
    } catch (e) {
    }
}
