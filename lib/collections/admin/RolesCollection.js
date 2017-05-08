/**
 * Created by holly on 7/05/17.
 */


EmaRoles = new Mongo.Collection("emaRoles");

//////////////////////////////////////////
// Apply Security
//

EmaRoles.allow({
    insert: () => false,
    update: () => false,
    remove: () => false
});

EmaRoles.deny({
    insert: () => true,
    update: () => true,
    remove: () => true
});

EmaRoles.addRole = function(role){

}

EmaRoles.updateRole = function(role){

}

EmaRoles.deleteRole = function(id){

}