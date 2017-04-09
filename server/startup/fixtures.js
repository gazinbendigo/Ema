/**
 * Created by adm9360_a on 17/03/2017.
 */


Meteor.startup(function() {

    UserTypes.remove({});
    if (UserTypes.find().count() === 0) {
        UserTypes.insert({USER_TYPE: UserType.Developer});
        UserTypes.insert({USER_TYPE: UserType.Analyst});
        UserTypes.insert({USER_TYPE: UserType.Administrator});
        UserTypes.insert({USER_TYPE: UserType.Configurator});
        UserTypes.insert({USER_TYPE: UserType.Installer});
    }


});