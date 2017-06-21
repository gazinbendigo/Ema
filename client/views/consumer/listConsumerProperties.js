/**
 * Created by holly on 21/06/17.
 */

Template.listConsumerProperties.onCreated(function() {
    ConsumerProperties.getFromServer(null);
    Environments.getFromServer(null);
});

Template.listConsumerProperties.helpers({

    getConsumerProperties: function() {
        return ConsumerProperties.find({});
    },

    getEnvironments:  () => {
        return Environments.find({});
    },

    environmentOptions: (envCode) =>{
        let selectedEnv = Template.instance().selectedEnvironment.get();
        let isSelected = selectedEnv.env === envCode.ENV_CODE;
        return {key: envCode.ENV_CODE, selected: isSelected ? 'selected' : '', value: `HUB${envCode.ENV_CODE}`};

    },
});

Template.listConsumerProperties.events({

});