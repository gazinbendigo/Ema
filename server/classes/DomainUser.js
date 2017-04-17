/**
 * Created by holly on 17/04/17.
 */


DomainUser = class DomainUser extends ApplicationUser {
    constructor(firstName, lastName, username, password, email){
        super(firstName, lastName, username, password, email);
        this.groups = [{groupName: GroupTypes.VMV, roles: [ApplicationFunctions.readOnly]},
            {groupName: GroupTypes.DEV, roles: [ApplicationFunctions.readOnly]},
            {groupName: GroupTypes.DOM, roles: [ApplicationFunctions.manageApps, ApplicationFunctions.manageProps, ApplicationFunctions.manageRouting, ApplicationFunctions.manageUsers, ApplicationFunctions.manageVersions]}];
    }

    getGroups(){
        return this.groups;
    }

    setGroups(groups) {
        this.groups = groups;
    }
}