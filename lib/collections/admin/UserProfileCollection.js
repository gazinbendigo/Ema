/**
 * Created by holly on 18/03/17.
 */

UserProfile = new Mongo.Collection(null);

UserProfile.isLoading = new ReactiveVar(false);
UserProfile.isLoaded = new ReactiveVar(false);


UserProfile.getProfile = (adm) => {
    UserProfile.isLoaded.set(false);
    UserProfile.isLoading.set(true);
    Meteor.call('getProfileByUsername', adm, function(err, result) {
        UserProfile.remove({});
        if(!err){
            UserProfile.insert(result);
        } else {
            console.log(err);
        }

        UserProfile.isLoaded.set(true);
        UserProfile.isLoading.set(false);
    });

}