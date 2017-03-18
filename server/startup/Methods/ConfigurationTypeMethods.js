/**
 * Created by adm9360 on 18/10/2016.
 */


Meteor.methods({
    getConfigurationTypes: function(){
        let path = BaseApiURI + "configurationTypes";
        return HTTPHelper.httpRequest("GET", path);
    }

})