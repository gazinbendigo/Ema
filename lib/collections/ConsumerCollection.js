/**
 * Created by adm9360 on 30/08/2016.
 */

//Consumers = new Mongo.Collection(null);
Consumers = new Mongo.Collection("hubConsumers");

Consumers.isLoading = new ReactiveVar(false);
//Consumers.isLoaded = new ReactiveVar(false);
Consumers.isLoaded = new ReactiveVar(true);

Consumers.getFromServer = function (environment){
    Consumers.isLoading.set(true);

    Meteor.call('getConsumers', environment, function(err, result) {
        Consumers.remove({});
        if(!err){
            _.each(result.data, function(row){
                Consumers.insert(row);
            });
        } else {
            console.log(err);
        }

        Consumers.isLoaded.set(true);
        Consumers.isLoading.set(false);
    });
}
