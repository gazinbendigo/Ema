/**
 * Created by adm9360 on 30/08/2016.
 */

//Consumers = new Mongo.Collection(null);
HubConsumers = new Mongo.Collection("hubConsumers");

HubConsumers.isLoading = new ReactiveVar(false);
//HubConsumers.isLoaded = new ReactiveVar(false);
HubConsumers.isLoaded = new ReactiveVar(true);

HubConsumers.getFromServer = function (environment){
    HubConsumers.isLoading.set(true);

    Meteor.call('getConsumers', environment, function(err, result) {
        HubConsumers.remove({});
        if(!err){
            _.each(result.data, function(row){
                HubConsumers.insert(row);
            });
        } else {
            console.log(err);
        }

        HubConsumers.isLoaded.set(true);
        HubConsumers.isLoading.set(false);
    });
}
