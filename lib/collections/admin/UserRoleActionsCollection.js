/**
 * Created by holly on 7/05/17.
 */

UserRoleActions = new Mongo.Collection("userRoleActions");


//////////////////////////////////////////
// Apply Security
//

UserRoleActions.allow({
    insert: () => false,
    update: () => false,
    remove: () => false
});

UserRoleActions.deny({
    insert: () => true,
    update: () => true,
    remove: () => true
});


UserRoleActions.addAction = function(action){

}

UserRoleActions.updateAction = function(action){

}

UserRoleActions.deleteAction = function(action){

}