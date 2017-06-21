/**
 * Created by holly on 21/06/17.
 */

ConsumerProperties = new Mongo.Collection(null);

ConsumerProperties.isLoading = new ReactiveVar(false);
ConsumerProperties.isLoaded = new ReactiveVar(true);

ConsumerProperties.getFromServer = function(env){
    ConsumerProperties.isLoaded.set(false);
    ConsumerProperties.isLoading.set(true);
    Meteor.call('getConsumerProperties', env, function(err, result) {
        ConsumerProperties.remove({});
        if(!err){
            _.each(result.data, function(row){
                ConsumerProperties.insert(row);
            });
        } else {
            console.log(err);
        }

        ConsumerProperties.isLoaded.set(true);
        ConsumerProperties.isLoading.set(false);
    });
    return ConsumerProperties.find({});
}