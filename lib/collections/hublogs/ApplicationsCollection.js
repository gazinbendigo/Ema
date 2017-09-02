/**
 * Created by holly on 10/01/2016.
 */

Applications = new Mongo.Collection(null);
//Applications = new Mongo.Collection("applications");

Applications.isLoading = new ReactiveVar(false);
Applications.isLoaded = new ReactiveVar(false);

Applications.allow({
    insert: () => false,
    update: () => false,
    remove: () => false
});

Applications.deny({
    insert: () => true,
    update: () => true,
    remove: () => true
});

Applications.getFromServer = function(env) {

    Applications.isLoading.set(true);
    Applications.isLoaded.set(false);

    Meteor.call('getApplications', env, function(err, result) {
        Applications.remove({});
        if(!err){
            _.each(result.data, function(app){
                Applications.insert(app);
            });
        } else {
            console.log(err);
        }

        Applications.isLoaded.set(true);
        Applications.isLoading.set(false);
    });
}
