/**
 * Created by holly on 13/05/17.
 */

Template.addEnvironment.onCreated(function() {
    let errorMsg = new ReactiveVar(null);
});

Template.addEnvironment.helpers({
    // responseMsg() {
    //     return Template.instance().errorMsg.get();
    // }
});

Template.addEnvironment.events({
    "click #addEnvironment": (evt, template) => {
        evt.preventDefault();
        console.log("j");
    }
});