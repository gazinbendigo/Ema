/**
 * Created by holly on 16/04/17.
 */


Developer = class Developer extends ApplicationUser{
    constructor(firstName, lastName, username, password, email){
        super(firstName, lastName, username, password, email);
        this.groups = new Map();
        this.addGroup(GroupTypes.VMV, [ApplicationFunctions.superUser]);
        this.addGroup(GroupTypes.DEV, [ApplicationFunctions.superUser]);
        this.addGroup(GroupTypes.DOM, [ApplicationFunctions.readOnly]);
    }

    getGroups(){
        return this.groups;
    }

    setGroups(groups) {
        this.groups = groups;
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

