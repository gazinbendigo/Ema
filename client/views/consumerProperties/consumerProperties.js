/**
 * Created by adm9360 on 19/08/2016.
 */
/**
 * Created by adm9360 on 19/08/2016.
 */

let dataList = [];

Template.manageConsumerProperties.onCreated(function(){
    //Meteor.subscribe("environments");
    if(Environments.find({}).count() === 0){
        Environments.getFromServer();
    }
    Meteor.subscribe("hubConsumers");
    Consumers.getFromServer('hubld');
    //ConsumerProperties.getFromServer();
    Meteor.subscribe("manageConsumerProperties");
});

Template.manageConsumerProperties.helpers({
    hasConsumerPropertiesLoaded: function () {
        return ConsumerProperties.isLoaded.get();
    },

    propertyRow: function(){
        return ConsumerProperties.find({});
    },

    linkClass: function(){
        return "image-align-right";
    },

    imgSrc: function(){
        return "<img src=\"/images/pencil-icon.ico\" width=\"16px\" height=\"16px\">";
    },

    href: function(){
        return "#form";
    },

    linkData: function(index){
        let src = "/images/pencil-icon.ico";
        let width = "16px";
        let height = "16px";
        return {href: "#form", linkClass: "image-align-right", linkId: index, imgSrc: src, imgWidth: width, imgHeight: height};
    },

    consumerProperty: function(){
        return Template.instance().consumerProperty.get();
    },

    consumers: function(){
        return Consumers.find({});
    },

    consumers: function(){
        return Consumers.find({}).fetch();
    },

    isEnvironmentsLoaded: function(){
        return Environments.isLoaded.get();
    },

    environments: function() {
        return Environments.find({ENVIRONMENT_TYPE_ID: 2});
    },

    url: function(){
        return "";
    },

    dropDownClass: function(){
        return "";
    },

    dropDownElements: function(text){
        return {url: "", cssClass: "", linkText: text};
    }
});

Template.manageConsumerProperties.events({
    "click a.image-align-right": function(event, template){
        console.log('a1');
        // template.consumerProperty.set(ConsumerProperties.findOne({consumerPropertyId: this.linkId}));
        // ($('#name').val(template.consumerProperty.get().propertyName));
        // ($('#value').val(template.consumerProperty.get().propertyValue));
    },
    //appCde:"IBS", brandCde:"BEN", consumerId:7, consumerPropertyId:7042, instanceCde:"D", propertyName:"VIP_SSL_PROTOCOL", propertyValue:"TLS"

    "click #addProperty" (event, template){
        event.preventDefault();
        // let consumerProperty = ConsumerProperties.findOne({}, {sort: {consumerPropertyId: -1}});//Sort +1 ACS, -1 DESC
        // let consumerId = consumerProperty.consumerId.substr(0, (consumerProperty.consumerId.length - 2));
        // let property = {
        //     consumerPropertyId: consumerProperty.consumerPropertyId + 1,
        //     consumerId: consumerId + (consumerProperty.consumerId + 1),
        //     propertyName: ($('#name').val()),
        //     propertyValue: ($('#value').val())
        // };
        // ConsumerProperties.addConsumerProperty(property, false);
        // ($('#name').val(""));
        // ($('#value').val(""));
    },

    "click #updateProperty" (event, template) {
        event.preventDefault();
        // let property = template.consumerProperty.get();
        // property.propertyName = ($('#name').val());
        // property.propertyValue = ($('#value').val());
        // ConsumerProperties.updateConsumerProperty(property, false);
        // ($('#name').val(""));
        // ($('#value').val(""));
    },

    "click #deleteProperty" (event, template){
        event.preventDefault();
        // ConsumerProperties.deleteConsumerProperty(template.consumerProperty.get());
        // ($('#name').val(""));
        // ($('#value').val(""));
    },

    "click .consumer" (event, template){
        event.preventDefault();
        console.log(this);
        let consumer = {
            brandCde: this.brandCde,
            appCde: this.appCde,
            instanceCde: this.instanceCde
        }
        //ConsumerProperties.getPropertiesByConsumer('hubld', this);
    }
});

