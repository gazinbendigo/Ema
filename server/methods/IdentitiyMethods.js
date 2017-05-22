/**
 * Created by adm9360 on 23/01/2017.
 */


Meteor.methods({

    //Use Meteor.users on the Server

    /**
     * Create a User Profile Account
     * @param userAccount
     * @returns {String}
     */
    createUserProfile: function(userAccount){
        console.log("called createUserProfile");
        console.log(JSON.stringify(userAccount));
        console.log(userAccount.userName);
        //Check rubbish is not being parsed from the front end.
        check(userAccount, {
                userName: String,
                password: String,
                confirmPassword: String,
                email: String,
                firstName: String,
                lastName: String,
                groups: {
                    TEST: Match.Maybe([String]),
                    DEV: Match.Maybe([String])
                }
        });

        let doesUserExist = Accounts.findUserByUsername(userAccount.userName);
        if(doesUserExist){
            throw new Meteor.Error("User " + userAccount.userName + " already exists!");
        }

        if(userAccount.password !== userAccount.confirmPassword){
            throw new Meteor.Error("Passwords do not match.");
        }

        //TODO: Other checks here later.

        console.log("Passed!! Maybe??");

        let id = Accounts.createUser({
            username: userAccount.userName,
            password: userAccount.password,
            email: userAccount.email
        });


        const userProfile = {
            firstName: userAccount.firstName,
            lastName: userAccount.lastName,
            groups: userAccount.groups
        }

        Meteor.users.update({_id: id}, {$set:{'name.0.verified': true}});
        Meteor.users.update({_id: id}, {$set:{profile: profile}});

        return "Success.";
    },


    updateUser: function(user){
        console.log(JSON.stringify(user));
        let userExists = Meteor.users.findOne({username: user.userName});
        if(userExists){
            if(user.password){
                Accounts.setPassword(user.id, user.password);
            }
            if(user.email){
                //if old email exists then remove it.
                let oldEmail = userExists.emails;
                if(oldEmail){
                    Accounts.removeEmail(userExists._id, userExists.emails[0].address);
                }
                Accounts.addEmail(userExists._id, user.email);
            }
            Meteor.users.update({_id: user.id}, {$set:{username: user.userName, "profile.firstName": user.firstName, "profile.lastName": user.lastName, groups: user.groups}});
            return "Success";
        }
        else {
            throw new Meteor.Error("User does not exist.");
        }
    },

    /**
     * Delete a user
     * @param userId
     * @returns {*}
     */
    deleteUser: function(userId){
        console.log("Called delete user");
        console.log(userId);
        Meteor.users.remove(userId._id);
        return "Success";
    },

    getIdentityByUsername: (userName) => {
        console.log(userName);
        let profile = Meteor.users.findOne({username: userName}, {fields: Meteor.users.publicFields});
        console.log(JSON.stringify(profile));
        return profile;
    },

    getUserProfiles: function(){
        return Meteor.users().find({}, {fields: {profile: 1, Role: 1, emails: 1, username: 1}});
    }

});

// // Get list of all method names on Lists
// const LISTS_METHODS = _.pluck([
//     createUserProfile,
//     updateUser,
//     deleteUser,
// ], 'name');
//
// // Only allow 5 list operations per connection per second
// DDPRateLimiter.addRule({
//     name(name) {
//         return _.contains(LISTS_METHODS, name);
//     },
//
//     // Rate limit per connection ID
//     connectionId() { return true; },
// }, 5, 1000);