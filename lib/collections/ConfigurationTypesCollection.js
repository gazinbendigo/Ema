/**
 * Created by adm9360 on 18/10/2016.
 */

ConfigurationType = new Mongo.Collection(null);

ConfigurationType.isLoading = new ReactiveVar(true);
//ConfigurationType.isLoaded = new ReactiveVar(false);
ConfigurationType.isLoaded = new ReactiveVar(true);

ConfigurationType.getFromServer = function(){
    ConfigurationType.isLoading.set(true);

    Meteor.call('getConfigurationTypes', function(err, result) {
        ConfigurationType.remove({});
        if(!err){
            _.each(result.data, function(row){
                ConfigurationType.insert(row);
            });
        } else {
            console.log(err);
        }
        ConfigurationType.isLoaded.set(true);
        ConfigurationType.isLoading.set(false);
    });
}


ConfigurationType.view = new ReactiveVar("");

ConfigurationType.showView = function(view){
    ConfigurationType.view.set(view);
}

ConfigurationType.hideView = function(){
    ConfigurationType.view.set("");
}