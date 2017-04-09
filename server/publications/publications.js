/**
 * Created by adm9360_a on 17/03/2017.
 */

/**
 * Publish a subset of the users data for security purposes. For reference the Full List includes:
 * { "_id" : "some hash", "createdAt" : ISODate("2017-03-18T02:12:40.034Z")
 * "services" : { "password" : { "bcrypt" : "$2a$10$a33HX38heyNBSguex8UrO.QvaNybGfnnDGSn/MYrHPWltPCHtl1am" } },
 * "username" : "user", "emails" : [ { "address" : "User8@hotmail.com", "verified" : false } ],
 * "profile" : { "firstName" : "some", "lastName" : "thing" }, "roles" : { "OTHER" : [ "super-admin" ], "DEV" : [ "analyst" ]}}
 */

Meteor.users.publicFields = {
    username: 1,
    emails: 1,
    'identity.firstName': 1,
    'identity.lastName': 1,
    'identity.primaryEnv': 1
}

Meteor.users.privateFields = {
    _id: 1,
    username: 1,
    emails: 1,
    roles: 1,
    'identity.firstName': 1,
    'identity.lastName': 1,
    'identity.primaryEnv': 1
}

Meteor.publish("identities", function() {
    if (!this.userId) {
        return this.ready();
    }
    //TODO: Add Admin component
    else {
        return Meteor.users.find({}, {fields: Meteor.users.publicFields});//this shows all user data
        //return Meteor.users.find({_id: this.userId}, {fields: Meteor.users.publicFields}); this shows just the logged in users data.
    }
});


Meteor.publish("UserTypes", function() {
    return UserTypes.find({});
});

Meteor.publish("EnvironmentTypes", function() {
    return EnvironmentTypes.find({}, {fields: {NAME:1}});
});
