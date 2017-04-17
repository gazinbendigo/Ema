/**
 * Created by holly on 16/04/17.
 */

ApplicationUser = class ApplicationUser{
    constructor(firstName, lastName, username, password, email, groups){
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.email = email;
        this.groups = groups;
    }

    getFirstName() {
        return this.firstName;
    }

    setFirstName(value) {
        this.firstName = value;
    }

    getLastName() {
        return this.lastName;
    }

    setLastName(value) {
        this.lastName = value;
    }

    getUsername() {
        return this.username;
    }

    setUsername(value) {
        this.username = value;
    }

    getPassword() {
        return this.password;
    }

    setPassword(value) {
        this.password = value;
    }

    getEmail() {
        return this.email;
    }

    setEmail(value) {
        this.email = value;
    }

    getGroups() {
        return this.groups;
    }

    setGroups(value) {
        this.groups = value;
    }
}



