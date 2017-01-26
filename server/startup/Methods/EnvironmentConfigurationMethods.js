/**
 * Created by adm9360 on 8/11/2016.
 */

Meteor.methods({
    getEnvironmentConfigurations: function(){
        return HTTPHelper.httpRequest("GET", BaseApiURI + "environment/configurations");
    }
})