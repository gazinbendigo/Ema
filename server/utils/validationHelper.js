/**
 * Created by adm9360 on 13/10/2016.
 */

//Declare Global Property
ValidationHelper = new Object();

ValidationHelper.isEnvironmentBlank = function (value){
    if(_.isObject(value)){
        if(_.isString(value.region)){
            return false;
        }
        return true;
    }
    return true;
}

