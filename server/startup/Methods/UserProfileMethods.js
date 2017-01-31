/**
 * Created by adm9360 on 23/01/2017.
 */


Meteor.methods({

    insertUserProfile(userProfile){
        check(userProfile, {
            ADM: String,
            FIRST_NME: String,
            LAST_NME: String,
            EMAIL: String,
            PASSWD: String
        });
        UserProfilesCollection.insert(userProfile);
    },

    addUserToRole(userProfile, role){

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