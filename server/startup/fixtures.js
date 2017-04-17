/**
 * Created by adm9360_a on 17/03/2017.
 */


Meteor.startup(function() {

    UserTypesList.remove({});
    if (UserTypesList.find().count() === 0) {
        // UserTypesList.insert({USER_TYPE: UserTypes.Developer.name});
        // UserTypesList.insert({USER_TYPE: UserTypes.Domain.name});
        // UserTypesList.insert({USER_TYPE: UserTypes.SystemUser.name});
    }


});