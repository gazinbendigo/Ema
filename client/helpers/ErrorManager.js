/**
 * Created by adm9360 on 27/10/2016.
 */

var isKnownError = function (error) {
    var errorName = error && error.error;
    var listOfKnownErrors = ['no-project-name', 'user-not-logged-in', 'project-not-found'];

    return _.contains(listOfKnownErrors, errorName);
};

