/**
 * Created by holly on 01/02/2016.
 */

//http://stackoverflow.com/questions/22087907/how-to-format-date-in-meteor-template
//https://atmospherejs.com/momentjs/moment
//http://momentjs.com/docs/
Template.registerHelper('formatDateTime', function(date){
    let time = moment(date).parseZone("Australia/Melbourne");
    return time.format('YYYY-MM-DD HH:mm:ss:SSS');
});