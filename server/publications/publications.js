/**
 * Created by adm9360_a on 17/03/2017.
 */

Meteor.publish("Users", function usersPublication(){
    return Meteor.users.find({});
});

Meteor.publish("UserGroups", () => {
    return UserGroups.find({});
});