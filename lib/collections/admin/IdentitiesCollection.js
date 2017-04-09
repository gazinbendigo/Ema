/**
 * Created by holly on 18/03/17.
 */

// identities is just a name of a record store on the Server
Identities = new Mongo.Collection("identities");

Identities.isLoading = new ReactiveVar(false);
Identities.isLoaded = new ReactiveVar(false);


Identities.getIdentity = (adm) => {
    Identities.isLoaded.set(false);
    Identities.isLoading.set(true);
    Meteor.call('getIdentityByUsername', adm, function(err, result) {
        Identities.remove({});
        if(!err){
            Identities.insert(result);
        } else {
            console.log(err);
        }

        Identities.isLoaded.set(true);
        Identities.isLoading.set(false);
    });

}