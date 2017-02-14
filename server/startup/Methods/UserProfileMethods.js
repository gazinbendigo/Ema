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
    createUserProfile: function(userAccount){
        console.log("called createUserProfile");
        console.log(JSON.stringify(userAccount));
        console.log(userAccount.userName);
        //Check rubbish is not being parsed from the front end.
        check(userAccount, {
                userName: String,
                password: String,
                email: String,
                firstName: String,
                lastName: String,
                groups: {
                    OTHER: Match.Maybe([String]),
                    DEV: Match.Maybe([String])
                }
        });

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
        Meteor.users.update({_id: id}, {$set:{profile: userProfile}});

        return "Success";
    },


    updateUser: function(user){
        console.log(JSON.stringify(user));
        try{
            Meteor.users.update({_id: user.id}, {$set:{username: user.userName, "profile.firstName": user.firstName, "profile.lastName": user.lastName, email: user.email, groups: user.groups}});
            cb(null, 'success');
        }
        catch(err){
            cb(err, null);
        }
    },

    /**
     * Delete a user
     * @param userId
     * @param cb
     * @returns {*}
     */
    deleteUser: function(userId){
        console.log("Called delete user");
        console.log(userId);
        try{
            Meteor.users.remove(userId);
        }
        catch(err){
            cb(err, null);
        }
        cb(null, '');
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


/////////////////////////////////////////////////
/// Check a users password.
// https://dweldon.silvrback.com/check-password
// Template.userAccount.events({
//     'click #check-password': function() {
//         var digest = Package.sha.SHA256($('#password').val());
//         Meteor.call('checkPassword', digest, function(err, result) {
//             if (result) {
//                 console.log('the passwords match!');
//             }
//         });
//     }
// });
//
//
// Meteor.methods({
//     checkPassword: function(digest) {
//         check(digest, String);
//
//         if (this.userId) {
//             var user = Meteor.user();
//             var password = {digest: digest, algorithm: 'sha-256'};
//             var result = Accounts._checkPassword(user, password);
//             return result.error == null;
//         } else {
//             return false;
//         }
//     }
// });