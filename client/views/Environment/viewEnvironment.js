/**
 * Created by adm9360 on 17/01/2017.
 */

Template.viewEnvironment.onCreated(function(){
    if(Environments.size() < 1){
        Environments.getFromServer();
    }
    Environments.setDefaultEnvironment();
    PropertiesByConsumer.getFromServer();
    ConsumerProperties.getFromServer('HUBLD');
});

Template.viewEnvironment.helpers({
    environments: function(){
        return Environments.getHubEnvironments();
    },

    environmentOptions: function(env){
        //Loops thru twice. TODO: Look into this.
        let storedEnv = Session.get(SELECTED_ENVIRONMENT);
        let isSelected = storedEnv === env.toUpperCase();
        return {key: env, selected: isSelected ? 'selected' : '', value: env};
    },

    getPropertiesByConsumer: function(){
        return PropertiesByConsumer.find({});
    },

    getConsumerPropertyName: function(){
        let names = PropertiesByConsumer.find({}).fetch();
        let rows = [];
        let cols = 4;
        //PropertiesByConsumer.find({}, {fields: {BRAND_CDE: 1, APPLICATION_CDE: 1, INSTANCE_CDE: 1}})
        return names;
    },

    getConsumerProperties: function(){
        return ConsumerProperties.find({});
    },

    extractConsumerPropertyTitle: function(){
        return ConsumerProperties.find({}, {fields: {BRAND_CDE:1, APPLICATION_CDE: 1, INSTANCE_CDE: 1}})
    }
});

Template.viewEnvironment.events({
    'change #hubEnvironments': function(event, template){
        event.preventDefault();
        Session.set(SELECTED_ENVIRONMENT, $('#hubEnvironments').val());
    }
});