/**
 * Created by adm9360 on 13/07/2017.
 */


ContainerPerformance = new Mongo.Collection(null);

ContainerPerformance.isLoading = new ReactiveVar(false);
ContainerPerformance.isLoaded = new ReactiveVar(false);

ContainerPerformance.getFromServer = (env, params) => {
    ContainerPerformance.isLoaded.set(false);
    ContainerPerformance.isLoading.set(true);

    Meteor.call('getContainerPerformance', region, queryParams, function(err, result) {
        ContainerPerformance.remove({});
        if(!err){
            _.each(result.data, function(row){
                ContainerPerformance.insert(row);
            });
        } else {
            console.log(err);
        }

        ContainerPerformance.isLoaded.set(true);
        ContainerPerformance.isLoading.set(false);
    });
}