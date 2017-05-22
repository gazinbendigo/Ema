/**
 * Created by holly on 7/05/17.
 */

Groups = new Mongo.Collection("groups");

//////////////////////////////////////////
// Apply Security
//

Groups.allow({
    insert: () => false,
    update: () => false,
    remove: () => false
});

Groups.deny({
    insert: () => true,
    update: () => true,
    remove: () => true
});

Groups.addGroup = function(group){

}

Groups.updateGroup = function(group){

}

Groups.deleteGroup = function(group){

}

