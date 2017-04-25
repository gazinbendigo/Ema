/**
 * Created by holly on 16/04/17.
 */


Developer = class Developer extends ApplicationUser{
    constructor(firstName, lastName, username, password, email){
        super(firstName, lastName, username, password, email, 'Developer');
        this.groups = new Map();
        this.groups.set('VMV', ['SuperUser']);
        this.groups.set('DEV', ['SuperUser']);
        this.groups.set('DOM', ['ReadOnly']);
        this.setGroups(this.groups);
    }

    getGroups(){
        return super.getGroups();
    }

    setGroups(values) {
        super.setGroups(values);
    }

    addGroup(groupName, roles){
        this.groups.set(groupName, roles);
    }

    addRoleToGroup(groupName, roles){
        this.groups.set(groupName, roles);
    }

}

// function _classCallCheck(instance, Constructor) {
//     if (!(instance instanceof Constructor)) {
//         throw new TypeError("Cannot call a class as a function");
//     }
// }


// Meteor.startup(function(){
//     class Truck extends Automobile {
//         constructor ( plainJSONObject ) {
//         }
//     }
//
//     Truck = Truck;
// })

