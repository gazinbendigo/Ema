/**
 * Created by holly on 7/07/17.
 */

ServicePerformanceStats = new Mongo.Collection(null);

ServicePerformanceStats.isLoaded = new ReactiveVar(false);
ServicePerformanceStats.isLoading = new ReactiveVar(false);

ServicePerformanceStats.getFromServer = function(env, queryParams){

    ServicePerformanceStats.isLoaded.set(false);
    ServicePerformanceStats.isLoading.set(true);
    Meteor.call('getServicePerformanceStats', region, queryParams, function(err, result) {
        ServicePerformanceStats.remove({});
        if(!err){
            _.each(result.data, function(row){
                ServicePerformanceStats.insert(row);
            });
        } else {
            console.log(err);
        }

        ServicePerformanceStats.isLoaded.set(true);
        ServicePerformanceStats.isLoading.set(false);
    });
    return ServicePerformanceStats.find({});

}