/**
 * Created by adm9360 on 2/11/2016.
 */


RequestServices = new Mongo.Collection(null);

RequestServices.isLoaded = new ReactiveVar(false);
RequestServices.isLoading = new ReactiveVar(false);

RequestServices.getByRequestId = function (env, requestId, cb) {
    RequestServices.isLoading.set(true);
    Meteor.call("getRequestServicesByRequestId", env, requestId, function(err, result){
        RequestServices.remove({});
        if(!err){
            let item = {SERVICE_ID: result.data.SERVICE_ID, SERVICE_NME: result.data.SERVICE_NME, REQUEST_DTE: result.data.REQUEST_DTE};
            RequestServices.insert(item);
            cb(null, item);
        }
        else {
            console.log(err);
            cb(err, false);
        }
    });
    RequestServices.isLoading.set(false);
    RequestServices.isLoaded.set(true);
}