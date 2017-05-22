/**
 * Created by holly on 13/05/17.
 */

Template.updateEnvironment.onCreated(function() {
    this.autorun(() => {
        this.subscribe("environments");
    });
});

Template.updateEnvironment.helpers({
    getEnvironmentsList() {
        return Environments.find({});
    }
});

Template.updateEnvironment.events({

});