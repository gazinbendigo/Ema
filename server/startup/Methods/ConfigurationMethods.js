/**
 * Created by adm9360 on 21/09/2016.
 */

Meteor.methods({
    getConfigurations: function () {
        let path = BaseApiURI + "configurations";
        return HTTPHelper.httpRequest("GET", path);
    },

    addConfiguration: function(configuration){
        if(configuration){
            try{
                return Configurations.insert(configuration);
            }
            catch ( exception ) {
                throw new Meteor.Error( '500', `${ exception }` );
            }
        }
    },

    updateConfiguration: function (configuration) {
        if(configuration){
            try{
                return Configurations.update({CONFIG_ID: configuration.CONFIG_ID}, {
                    $set: configuration
                });
            }
            catch(exception){
                throw new Meteor.Error('500', `${exception}`);
            }
        }
    },

    deleteConfiguration: function (configId) {
        if(configId){
            try{
                return Configurations.remove({CONFIG_ID: configId});
            }
            catch(exception){
                throw new Meteor.Error('500', `${exception}`);
            }
        }
    }
});