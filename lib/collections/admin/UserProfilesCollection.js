/**
 * Created by adm9360 on 20/01/2017.
 */


/**
 * Accounts-base provides a standard schema accessed thru Meteor.users and the client-side singletons Meteor.userId()
 * and Meteor.user(), which represent the login state on the client.
 * Meteor.user() gets the whole user document
 */


UserProfilesCollection = new Mongo.Collection(null);

UserProfilesCollection.isLoading = new ReactiveVar(false);
UserProfilesCollection.isLoaded = new ReactiveVar(true);

//Setup Security
UserProfilesCollection.allow({
    insert() { return false; },
    update() { return false; },
    remove() { return false; }
});

UserProfilesCollection.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; }
});

UserProfilesCollection.addUserProfile = function(profile){

}

// UserProfileSchema = new SimpleSchema({
//     admNumber: {
//         type: String,
//         label: "Adm"
//     }
// });

UserProfilesCollection.getProfileByUsername = (adm) => {
    UserProfilesCollection.isLoaded.set(false);
    UserProfilesCollection.isLoading.set(true);

    UserProfilesCollection.remove({});
    Meteor.call('getProfileByUsername', adm, function(err, res){
        if(err){
            console.log(err.error);
        }
        else {
            console.log(JSON.stringify(res.profile));
            console.log("Username = " + res.username);
            userData = {
                username: res.username,
                profile: res.profile,
                email: res.emails[0]
            };

            UserProfilesCollection.insert(userData);

            UserProfilesCollection.isLoaded.set(true);
            UserProfilesCollection.isLoading.set(false);
        }

    });
};


