/**
 * Created by adm9360 on 21/09/2016.
 */

Configurations = new Mongo.Collection(null);
//Configurations = new Mongo.Collection("configurations");

Configurations.isLoaded = new ReactiveVar(false);
Configurations.isLoading = new ReactiveVar(false);
// Configurations.isLoading = new ReactiveVar(true);

Configurations.getFromServer = function(){
    Configurations.isLoaded.set(false);
    Configurations.isLoading.set(true);

    Meteor.call('getConfigurations', function(err, result) {
        Configurations.remove({});
        if(!err){
            _.each(result.data, function(row){
                Configurations.insert(row);
            });
        } else {
            console.log(err);
        }

    });
    Configurations.isLoaded.set(true);
    Configurations.isLoading.set(false);
};

Configurations.applyChange = function(submitType, configItem, callback){
    Configurations.isLoaded.set(false);
    Configurations.isLoading.set(true);
    Meteor.call(submitType, configItem, (err) => {
        if(err){
            console.log(err);
            callback(err, false);
        }
        else {
            callback(null, true);
        }
    });
    Configurations.isLoaded.set(true);
    Configurations.isLoading.set(false);
}

Configurations.updateUberHubEnvItem = new ReactiveVar(null);

