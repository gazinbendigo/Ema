/**
 * Created by adm9360 on 30/06/2016.
 */


Template.registerHelper('extractIntFromString', function(value){
    if(_.isNumber(value))
    {
        if(value.type === NaN)
        {
            return 0;
        }
        else {
            return parseInt(value);
        }
    }
    return 0;
});