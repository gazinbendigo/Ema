/**
 * Created by holly on 11/07/17.
 */


ComponenetPerformance = new Mongo.Collection(null);

ComponenetPerformance.isLoading = new ReactiveVar(false);
ComponenetPerformance.isLoaded = new ReactiveVar(false);

ComponenetPerformance.getFromServer = (env, params) => {

    ComponenetPerformance.isLoaded.set(false);
    ComponenetPerformance.isLoading.set(true);
    Meteor.call('getComponentPerformance', region, queryParams, function(err, result) {
        ComponenetPerformance.remove({});
        if(!err){
            _.each(result.data, function(row){
                ComponenetPerformance.insert(row);
            });
        } else {
            console.log(err);
        }

        ComponenetPerformance.isLoaded.set(true);
        ComponenetPerformance.isLoading.set(false);
    });
    return ComponenetPerformance.find({});
}