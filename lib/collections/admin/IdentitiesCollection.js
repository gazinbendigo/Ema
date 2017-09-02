/**
 * Created by holly on 18/03/17.
 */

// identities is just a name of a record store on the Server
Identities = new Mongo.Collection("Identities");

Identities.isLoading = new ReactiveVar(false);
Identities.isLoaded = new ReactiveVar(true);


// Identities.getIdentity = (adm) => {
//     Identities.isLoaded.set(false);
//     Identities.isLoading.set(true);
//     Meteor.call('getIdentityByUsername', adm, function(err, result) {
//         //Identities.remove({});
//         if(!err){
//             console.log(JSON.stringify(result));
//             Identities.isLoaded.set(true);
//             Identities.isLoading.set(false);
//             return result;
//         } else {
//             console.log(err);
//         }
//     });
//
// }