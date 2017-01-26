/**
 * Created by adm9360 on 23/01/2017.
 * This script enforces that any modification to Users can only occur on the Server.
 * Any changes to the Users Collection can only occur on the Server through method calls.
 */


//Deny allow rules on the user Collection
Meteor.users.allow({
    insert() { return false; },
    update() { return false; },
    remove() { return false; }
});

//Deny updates to user Collection
Meteor.users.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; }
});