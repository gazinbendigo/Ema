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
Meteor.publish("Users", () => {
    return Meteor.users.find({}, {fields: {profile: 1, roles: 1, emails: 1, username: 1}});
});


Meteor.publish("UserGroups", () => {
    return UserGroups.find({});
});