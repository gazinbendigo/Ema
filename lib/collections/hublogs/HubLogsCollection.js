/**
 * Created by holly on 10/01/2016.
 */


HubLogs = new Mongo.Collection(null);
//HubLogs = new Mongo.Collection("hublogs");

HubLogs.isLoading = new ReactiveVar(false);
HubLogs.isLoaded = new ReactiveVar(true);//false);

HubLogs.getFromServer = function(region, queryParams) {
    HubLogs.isLoaded.set(false);
    HubLogs.isLoading.set(true);
    Meteor.call('getHubLogs', region, queryParams, function(err, result) {
        HubLogs.remove({});
        if(!err){
            _.each(result.data, function(row){
                HubLogs.insert(row);
            });
        } else {
            console.log(err);
        }

        HubLogs.isLoaded.set(true);
        HubLogs.isLoading.set(false);
    });
    return HubLogs.find({});
}

HubLogs.insertFromServer = function(region, queryParams) {
    HubLogs.isLoaded.set(false);
    HubLogs.isLoading.set(true);
    Meteor.call('getHubLogs', region, queryParams, function(err, result) {
        if(!err){
            _.each(result.data, function(row){
                HubLogs.insert(row);
            });
        } else {
            console.log(err);
        }

        HubLogs.isLoaded.set(true);
        HubLogs.isLoading.set(false);
    });
    return HubLogs.find({});
}

