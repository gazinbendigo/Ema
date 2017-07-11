/**
 * Created by holly on 8/07/17.
 */

ContainerPerformanceStats = new Mongo.Collection(null);

ContainerPerformanceStats.isLoaded = new ReactiveVar(false);
ContainerPerformanceStats.isLoading = new ReactiveVar(false);

ContainerPerformanceStats.getFromServer = (env, params) => {

    ContainerPerformanceStats.isLoaded.set(false);
    ContainerPerformanceStats.isLoading.set(true);

    Meteor.call('getContainerPerformance', region, queryParams, function(err, result) {
        ContainerPerformanceStats.remove({});
        if(!err){
            _.each(result.data, function(row){
                ContainerPerformanceStats.insert(row);
            });
        } else {
            console.log(err);
        }

        ContainerPerformanceStats.isLoaded.set(true);
        ContainerPerformanceStats.isLoading.set(false);
    });
    return ContainerPerformanceStats.find({});
}