/**
 * Created by adm9360 on 20/01/2017.
 */

UserProfilesCollection = new Mongo.Collection("userProfiles");


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

UserProfileSchema = new SimpleSchema({
    admNumber: {
        type: String,
        label: "Adm"
    }
});