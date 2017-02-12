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
                username: String,
                password: String,
                emails: String,
                firstName: String,
                lastName: String,
                groups: {
                    OTHER: Match.Maybe([String]),
                    DEV: Match.Maybe([String])
                }
            }
        });

        console.log("Passed!! Maybe??");

        let id = Accounts.createUser({
            username: userAccount.profile.username,
            password: userAccount.profile.password,
            email: userAccount.profile.email
        });


        const userProfile = {
            firstName: userAccount.profile.firstName,
            lastName: userAccount.profile.lastName,
            groups: userAccount.profile.groups
        }

        Meteor.users.update({_id: id}, {$set:{'name.0.verified': true}});
        Meteor.users.update({_id: id}, {$set:{profile: userProfile}});

        // {"profile":
        //     {"user":
        //         {
        //             "username":"","password":"","emails":""},
        //             "userProfile":{"firstName":"","lastName":""},
        //             "userRoles":{"common":[],"DEV":[]
        //         }
        //     }
        // }

        // if(userAccount.profile.user.userRoles.DEV.length > 0){
        //     _.each(userAccount.profile.user.userRoles.DEV, function(role){
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


    updateUser: function(user, cb){
        console.log(JSON.stringify(user));
        try{
            return cb(null, '');
        }
        catch(err){
            return cb(err, null);
        }
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


});