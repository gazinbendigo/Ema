/**
 * Created by adm9360 on 8/11/2016.
 */

EnvironmentConfiguration = new Mongo.Collection(null);

EnvironmentConfiguration.isLoaded = new ReactiveVar(true);
EnvironmentConfiguration.isLoading = new ReactiveVar(false);

EnvironmentConfiguration.getFromServer = function(){
    EnvironmentConfiguration.isLoaded.set(false);
    EnvironmentConfiguration.isLoading.set(true);

    Meteor.call('getEnvironmentConfigurations', function(err, result) {
        Environments.remove({});
        if(!err){
            _.each(result.data, function(row){
                Environments.insert(row);
            });
        } else {
            console.log(err);
        }
    });
    EnvironmentConfiguration.isLoaded.set(false);
    EnvironmentConfiguration.isLoading.set(true);
}



