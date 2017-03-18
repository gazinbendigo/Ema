/**
 * Created by adm9360 on 2/11/2016.
 */

RequestServiceAverages = new Mongo.Collection(null);

RequestServiceAverages.isLoading = new ReactiveVar(false);
RequestServiceAverages.isLoaded = new ReactiveVar(false);

RequestServiceAverages.getFromServer = function(env, queryParams, cb){
    RequestServiceAverages.isLoading.set(true);

    Meteor.call('getRequestServiceAverages', env, queryParams, function(err, result) {
        RequestServiceAverages.remove({});
        if(!err){
            _.each(result, function(row){
                RequestServiceAverages.insert(row);
            });
            cb(null, true);
        } else {
            // console.log(err);
            cb(err, null);
        }

        RequestServiceAverages.isLoaded.set(true);
        RequestServiceAverages.isLoading.set(false);
    });
}

