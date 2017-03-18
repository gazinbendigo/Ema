/**
 * Created by adm9360 on 27/10/2016.
 */

/**
 * This should only be called from the Server
 * @param error
 * @param reason
 * @param details
 */
throwError = function(error, reason, details) {
    var meteorError = new Meteor.Error(error, reason, details);
    throw meteorError;
}