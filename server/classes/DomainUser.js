/**
 * Created by holly on 17/04/17.
 */


DomainUser = class DomainUser extends ApplicationUser {
    constructor(firstName, lastName, username, password, email){
        super(firstName, lastName, username, password, email, 'Domain');
        this.groups = new Map();
        this.groups.set('VMV', ['ReadOnly']);
        this.groups.set('DEV', ['ReadOnly']);
        this.groups.set('DOM', ['ManageApps', 'ManageVersions', 'ManageRouting', 'ManageProps', 'ManageUsers'])
        super.setGroups(this.groups);
    }

    getGroups(){
        return super.getGroups();
    }

    setGroups(values) {
        super.setGroups(values);
    }
}