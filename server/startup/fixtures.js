/**
 * Created by adm9360_a on 17/03/2017.
 */


Meteor.startup(function() {
    UserGroups.remove({});
    if (UserGroups.find().count() === 0) {
        UserGroups.insert({GROUP_NME: "Installer"});
        UserGroups.insert({GROUP_NME: "Administrator"});
        UserGroups.insert({GROUP_NME: "Analyst"});
        UserGroups.insert({GROUP_NME: "SuperUser"});
    }
});