Meteor.startup(() => {
    Accounts.callLoginMethod({
        methodArguments: [{type: 'adfs', id: Injected.meta('adfs-auth')}],
        userCallback(error, result) {

        }
    })
});