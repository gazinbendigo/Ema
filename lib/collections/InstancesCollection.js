/**
 * Created by holly on 18/09/16.
 */


Instances = new Mongo.Collection(null);

Instances.isLoaded = new ReactiveVar(false);
Instances.isLoading = new ReactiveVar(false);

Instances.loadFromServer = function () {
    Instances.isLoading.set(true);
    Meteor.call('getInstances', function(err, result){
        Instances.remove({});
        if(!err){
            _.each(result.data, function (row) {
                Instances.insert(row);
            });
        }
        else {
            console.log(err);
        }
        Instances.isLoaded.set(true);
        Instances.isLoading.set(false);
    });

    // return Instances.find({});
}