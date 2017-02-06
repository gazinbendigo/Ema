/**
 * Created by adm9360 on 23/01/2017.
 */


Meteor.methods({

    createUserProfile: function(userAccount){
        console.log("called createUserProfile");
        console.log(JSON.stringify(userAccount));
        console.log(userAccount.profile.user.username);
        console.log(userAccount.profile.userProfile.firstName);
        console.log(userAccount.profile.roles);
        let user = userAccount.profile.user;
        check(user, {
            username: String,
            password: String,
            emails: String
        });

        let userProfile = userAccount.profile.userProfile;
        check(userProfile, {
            firstName: String,
            lastName: String,
            team: String,
            userGroup: Match.Maybe([String])
        });

        let roles = userAccount.profile.userRoles;
        check(roles, {
            roles: [String]
        });

        let devRoles = userAccount.profile.developerRoles;
        check(devRoles, {
            devRoles: Match.Maybe([String])
        });

        // check(userProfile, {
        //     ADM: String,
        //     FIRST_NME: String,
        //     LAST_NME: String,
        //     EMAIL: String,
        //     PASSWD: String
        // });
        // id = Accounts.createUser({
        //     username: userAccount.user.username,
        //     password: userAccount.user.password,
        //     email: userAccount.email
        // });

        // const userProfile = {
        //     firstName: userAccount.userDetails.firstName,
        //     lastName: userAccount.userDetails.lastName,
        //     team: userAccount.userDetails.team,
        //     userGroup: (userData.group === "__global_roles__") ? "SuperUser": userData.group
        // }
        //
        // let userProfile = {firstName: "hi", lastName: "", team: "", userGroup: ""};
        // let user = {username: "", password: "", emails: ""};
        // let roles = [];
        // return {profile: {user, userProfile, roles}};

    },

    /**
     * Delete a User from a specific Group
     * @method deleteUserFromGroup
     * @param userId
     * @param group
     */
    deleteUserFromGroup(userId, group){
        let loggedInUser = Meteor.user();
        if(!loggedInUser || !Roles.userIsInRole(loggedInUser, [''], group)){
            throw new Meteor.Error(403, "Access Denied");
        }
        //remove permissions for target group
        Roles.setUserRoles(userId, [], group);
    }

});