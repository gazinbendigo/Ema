/**
 * Created by holly on 18/09/16.
 */


Components = new Mongo.Collection(null);

Components.isLoading = new ReactiveVar(false);
Components.isLoaded = new ReactiveVar(true);

Components.getFromServer = function () {
    Components.isLoaded.set(false);
    Components.isLoading.set(true);

    Meteor.call('getComponents', function (err, result) {
        if(!err){
            _.each(result.data, function(row){
                Components.insert(row);
            });
        }
        else {
            console.log(err);
        }
        Components.isLoaded.set(true);
        Components.isLoading.set(false);
    });

    // return Components.find({});
}