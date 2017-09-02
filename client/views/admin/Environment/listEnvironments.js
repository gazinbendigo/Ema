/**
 * Created by holly on 13/05/17.
 */

Template.listEnvironments.onCreated(function() {
    this.autorun(() => {
       this.subscribe("environments");
    });
});

Template.listEnvironments.helpers({
    getEnvironmentsList() {
        return Environments.find({});
    },

    updateEnvPath(envId) {
        let param = {id: envId};
        return FlowRouter.path("updateEnvironment", param);
    }
});

Template.listEnvironments.events({

});