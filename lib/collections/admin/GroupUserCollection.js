/**
 * Created by holly on 7/05/17.
 */

GroupUser = new Mongo.Collection("groupUser");


//////////////////////////////////////////
// Apply Security
//

GroupUser.allow({
    insert: () => false,
    update: () => false,
    remove: () => false
});

GroupUser.deny({
    insert: () => true,
    update: () => true,
    remove: () => true
});