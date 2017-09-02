/**
 * Created by holly on 11/07/17.
 */


OverallPerformance = new Mongo.Collection(null);

OverallPerformance.isLoaded = new ReactiveVar(false);
OverallPerformance.isLoading = new ReactiveVar(false);

OverallPerformance.getFromServer = (env, params) => {

    OverallPerformance.isLoaded.set(false);
    OverallPerformance.isLoading.set(true);

    Meteor.call('getOverallPerformance', region, queryParams, function(err, result) {
        OverallPerformance.remove({});
        if(!err){
            _.each(result.data, function(row){
                OverallPerformance.insert(row);
            });
        } else {
            console.log(err);
        }

        OverallPerformance.isLoaded.set(true);
        OverallPerformance.isLoading.set(false);
    });
    return OverallPerformance.find({});
}
