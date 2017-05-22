/**
 * Created by adm9360 on 30/08/2016.
 */

HTTPHelper = new Object();

HTTPHelper.httpRequest = function httpRequest(method, path, params) {

    return Meteor.wrapAsync((cb) => {
        HTTP.call(method,
            path,
            params,
            (err, res) => {
                cb(null, { err, data: res ? res.data : null });
            });
    })();
}

HTTPHelper.jsonHeaders = function jsonHeaders(params){
    let header = {
        data: params,
        headers: {'Content-Type': 'application/json'}
    };
    return header;
}