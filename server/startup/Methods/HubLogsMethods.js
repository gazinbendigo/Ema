/**
 * Created by holly on 10/01/2016.
 */

var Future = Npm.require('fibers/future');

Meteor.methods({
    getHubLogs: function(env, params) {
        let environment = ValidationHelper.isEnvironmentBlank(env) ? DefaultEnv : env.envName;
        let path = BaseApiURI + "hublogs/" + environment + "?";
        return HTTPHelper.httpRequest("GET", path, {params});
    }

    // getEnvironments: function(params) {
    //     Environments.remove({});
    //     //HTTPHelper.httpRequest(GET, BaseApiURI + "env", params, (err, res) =>
    //     //{callback(null, {err, _.each(res.data, function(r){Environments.insert(r);})})});
    //
    //     this.unblock();
    //     Meteor.http.get(BaseApiURI + ENV, function(err, result){
    //         if(err)
    //         {
    //             throw(err);
    //         }
    //         else
    //         {
    //             _.each(result.data, function(r){
    //                 Environments.insert(r);
    //             });
    //         }
    //     });
    // },

});



