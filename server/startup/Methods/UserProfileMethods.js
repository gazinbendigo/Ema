/**
 * Created by adm9360 on 23/01/2017.
 */


Meteor.methods({

    /**
     * Create a User Profile Account
     * @param userAccount
     * @param cb
     * @returns {String}
     */
    createUserProfile: function(userAccount, cb){
        console.log("called createUserProfile");
        console.log(JSON.stringify(userAccount));
        //Check rubbish is not being parsed from the front end.
        check(userAccount, {
            profile: {
                user: {
                    username: String,
                    password: String,
                    emails: String
                },
                userProfile: {
                    firstName: String,
                    lastName: String
                },
                userRoles: {
                    common: Match.Maybe([String]),
                    devRoles: Match.Maybe([String])
                }
            }
        });

        console.log("Passed!! Maybe??");

        let id = Accounts.createUser({
            username: userAccount.profile.user.username,
            password: userAccount.profile.user.password,
            email: userAccount.profile.user.emails
        });


        const userProfile = {
            firstName: userAccount.profile.userProfile.firstName,
            lastName: userAccount.profile.userProfile.lastName,
            groups: userAccount.profile.userRoles
        }

        Meteor.users.update({_id: id}, {$set:{'name.0.verified': true}});
        Meteor.users.update({_id: id}, {$set:{userProfile: userProfile}});

        // {"profile":
        //     {"user":
        //         {
        //             "username":"","password":"","emails":""},
        //             "userProfile":{"firstName":"","lastName":""},
        //             "userRoles":{"common":[],"devRoles":[]
        //         }
        //     }
        // }

        // if(userAccount.profile.user.userRoles.devRoles.length > 0){
        //     _.each(userAccount.profile.user.userRoles.devRoles, function(role){
        //         Roles.addUsersToRoles(id, ApplicationRoles.getApplicationRolesByGroup(role));
        //     });
        //     // By default a Developer should always have read-only access to OTHER environments.
        //     if(userAccount.profile.user.userRoles.common.length === 0){
        //         Roles.addUsersToRoles(id, ApplicationRoles.getApplicationRolesByGroup(ApplicationRoles.properties[ApplicationRoles.Analyst].group));
        //     }
        // }
        // if(userAccount.profile.user.userRoles.common.length > 0){
        //     _.each(userAccount.profile.userRoles.common, function(role){
        //         Roles.addUsersToRoles(id, ApplicationRoles.getApplicationRolesByGroup(role));
        //     });
        // }

        console.log(Accounts.findUserByEmail(userAccount.profile.user.username));
        // return cb(null, "Profile Added.");
        return new String("Profile Added.");
    },

    /**
     * Delete a user
     * @param userId
     * @param cb
     * @returns {*}
     */
    deleteUser: function(userId, cb){
        console.log("Called delete user");
        try{
            Meteor.users.remove(userId);
        }
        catch(err){
            return cb(err, null);
        }
        return(null, '');
    },

    updateUser: function(userProfile, cb){

        let id = userProfile._id;
        try{
            Meteor.users.update({_id: id}, {$set:{userProfile: userProfile}});
        }
        catch(err){
            return cb(err, null);
        }
        return cb(null, '');
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