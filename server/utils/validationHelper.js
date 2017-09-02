/**
 * Created by adm9360 on 13/10/2016.
 */

//Declare Global Property
ValidationHelper = new Object();

ValidationHelper.isEnvironmentBlank = function (value){
    if(_.isObject(value)){
        if(_.isString(value.env)){
            //env is not blank
            return false;
        }
        return true;
    }
    return true;
}

