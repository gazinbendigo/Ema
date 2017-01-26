/**
 * Created by adm9360 on 17/01/2017.
 */


PropertiesByConsumer = new Mongo.Collection(null);

PropertiesByConsumer.isLoading = new ReactiveVar(false);
PropertiesByConsumer.isLoaded = new ReactiveVar(true);

PropertiesByConsumer.getFromServer = function() {
    PropertiesByConsumer.isLoaded.set(false);
    PropertiesByConsumer.isLoading.set(true);
    Meteor.call('getPropertiesByConsumer', Session.get(SELECTED_ENVIRONMENT), function(err, result) {
        PropertiesByConsumer.remove({});
        if(!err){
            _.each(result.data, function(row){
                PropertiesByConsumer.insert(row);
                console.log(row);
            });
        } else {
            console.log(err);
        }

        PropertiesByConsumer.isLoaded.set(true);
        PropertiesByConsumer.isLoading.set(false);
    });
    return PropertiesByConsumer.find({});
}