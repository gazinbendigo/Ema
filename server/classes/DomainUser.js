/**
 * Created by holly on 17/04/17.
 */


DomainUser = class DomainUser extends ApplicationUser {
    constructor(firstName, lastName, username, password, email){
        super(firstName, lastName, username, password, email, 'Domain');
        this.groups = new Map();
        this.groups.set('VMV', ['read-only']);
        this.groups.set('DEV', ['read-only']);
        this.groups.set('DOM', ['manage-apps', 'manage-versions', 'manage-routing', 'manage-props', 'manage-users'])
        super.setGroups(this.groups);
    }

    getGroups(){
        return super.getGroups();
    }

    setGroups(values) {
        super.setGroups(values);
    }
}