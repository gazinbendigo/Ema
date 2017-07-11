/**
 * Created by holly on 11/07/17.
 */


OverallPerformanceCollection = new Mongo.Collection(null);

OverallPerformanceCollection.isLoaded = new ReactiveVar(false);
OverallPerformanceCollection.isLoading = new ReactiveVar(false);

OverallPerformanceCollection.getFromServer = (env, params) => {

    OverallPerformanceCollection.isLoaded.set(false);
    OverallPerformanceCollection.isLoading.set(true);

    Meteor.call('getOverallPerformance', region, queryParams, function(err, result) {
        OverallPerformanceCollection.remove({});
        if(!err){
            _.each(result.data, function(row){
                OverallPerformanceCollection.insert(row);
            });
        } else {
            console.log(err);
        }

        OverallPerformanceCollection.isLoaded.set(true);
        OverallPerformanceCollection.isLoading.set(false);
    });
    return OverallPerformanceCollection.find({});
}
