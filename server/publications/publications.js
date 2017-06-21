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

publicFields = {
    adm: 1,
    emails: 1,
    'identity.firstName': 1,
    'identity.lastName': 1,
    'identity.groupId': 1
}

Meteor.users.privateFields = {
    _id: 1,
    adm: 1,
    emails: 1,
    roles: 1,
    'identity.firstName': 1,
    'identity.lastName': 1,
    'identity.groupId': 1
}

Meteor.publish('Identities', function() {
    // if (!this.userId) {
    //     return this.ready();
    // }
    // //TODO: Add Admin component
    // else {
        return Meteor.users.find({});//, {fields: publicFields});//this shows all user data
        //return Meteor.users.find({_id: this.userId}, {fields: Meteor.users.publicFields}); this shows just the logged in users data.
    // }
});

Meteor.publish('UserData', function() {
   return Meteor.users.find({}, {fields: {profile: 1}});
});

Meteor.publish("UserTypes", function() {
    let cursor =  UserTypes.find({});
    if(cursor){
        return cursor;
    }
    return this.ready();
});

/**
 * Publishes the environments for the region specified in the Settings.js file
 */
Meteor.publish("environments", function() {
    let cursor =  undefined;
    //Development Setting: When set to 0 return everything.
    if(IsEnvVisible === 0){
        cursor = Environments.find({}, {sort: {ENV_ID: 1}});
    }
    else {
        cursor = Environments.find({}, {fields: {IS_VISIBLE: IsEnvVisible}})
    }
    if(cursor){
        return cursor;
    }
    return this.ready();
});

Meteor.publish('ApplicationRoles', function() {
    let cursor =  ApplicationRoles.find({});
    if(cursor){
        return cursor;
    }
    return this.ready();
});

Meteor.publish("groups", function() {
    let cursor =  Groups.find({});
    if(cursor){
        return cursor;
    }
    return this.ready();
});

Meteor.publish("emaRoles", function() {
    let cursor =  EmaRoles.find({});
    if(cursor){
        return cursor;
    }
    return this.ready();
});

// Meteor.publish("groupUser", function() {
//     return GroupUser.find({});
// });
//
// Meteor.publish("userRoleActions", function() {
//     return UserRoleActions.find({});
// });
