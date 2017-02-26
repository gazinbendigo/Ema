/**
 * Created by adm9360 on 23/08/2016.
 */

ConsumerProperties = new Mongo.Collection(null);
//ConsumerProperties = new Mongo.Collection("manageConsumerProperties");

ConsumerProperties.isLoading = new ReactiveVar(false);
ConsumerProperties.isLoaded = new ReactiveVar(false);

ConsumerProperties.getFromServer = function(env){
    ConsumerProperties.isLoading.set(true);
    ConsumerProperties.isLoaded.set(false);

    Meteor.call('getConsumerPropertiesByEnvironment', env, function(err, result){
        if(err) {
            console.log(err);
            return err;
        }
        else {
            ConsumerProperties.remove({});
            _.each(result.data, function(row){
                ConsumerProperties.insert(row);
            });
        }
        ConsumerProperties.isLoading.set(false);
        ConsumerProperties.isLoaded.set(true);
    });

}



// ConsumerProperties.updateConsumerProperty = function(property, updateAll) {
//     ConsumerProperties.isLoading.set(true);
//     ConsumerProperties.isLoaded.set(false);
//     Meteor.call('updateConsumerProperty', property, updateAll, function(err, result) {
//         //ConsumerProperties.remove({});
//         if(err){
//             console.log(err);
//         } else {
//
//         }
//
//         ConsumerProperties.isLoaded.set(true);
//         ConsumerProperties.isLoading.set(false);
//     });
// }
//
// ConsumerProperties.insertConsumerProperty = function(property, updateAll){
//     ConsumerProperties.isLoading.set(true);
//     ConsumerProperties.isLoaded.set(false);
//     Meteor.call('insertConsumerProperty', property, function(err, result){
//        if(err){
//            console.log(err);
//        }
//     });
//     ConsumerProperties.isLoaded.set(true);
//     ConsumerProperties.isLoading.set(false);
// }
//
// ConsumerProperties.deleteConsumerProperty = function(property, deleteAll){
//     ConsumerProperties.isLoading.set(true);
//     ConsumerProperties.isLoaded.set(false);
//     Meteor.call('deleteConsumerProperty', property, function(err, result){
//         if(err){
//            console.log(err);
//         }
//     });
//     ConsumerProperties.isLoaded.set(true);
//     ConsumerProperties.isLoading.set(false);
// }
//
// ConsumerProperties.getPropertiesByConsumer = function(env, consumer){
//     ConsumerProperties.isLoading.set(true);
//     ConsumerProperties.isLoaded.set(false);
//     // Meteor.call('getConsumerPropertiesByConsumer', env, consumer, function(err, result){
//     //     ConsumerProperties.remove({});
//     //     if(err){
//     //         console.log(err);
//     //     } else {
//     //         _.each(result.data, function(row){
//     //             console.log(row);
//     //             ConsumerProperties.insert(row);
//     //         });
//     //     }
//     // });
//     ConsumerProperties.isLoaded.set(true);
//     ConsumerProperties.isLoading.set(false);
// }
//
//
// ConsumerPropertiesSchema = new SimpleSchema({
//     "consumerPropertyId": {
//         type: Number
//     },
//     "brandCde": {
//         type: String
//     },
//     "appCde": {
//         type: String
//     },
//     "instanceCde": {
//         type: String
//     },
//     "propertyName": {
//         type: String
//     },
//     "propertyValue": {
//         type: String
//     },
//     "consumerId": {
//         type: Number
//     }
// });
//
// ConsumerProperties.attachSchema(ConsumerPropertiesSchema);
