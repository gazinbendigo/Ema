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
    }

});