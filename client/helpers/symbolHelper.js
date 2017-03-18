/**
 * Created by adm9360 on 22/03/2016.
 */

Template.registerHelper('leftArrow', function(){
    return new Handlebars.SafeString('&#8592;&nbsp;');
});

Template.registerHelper('rightArrow', function(){
    return new Handlebars.SafeString('&#8594;&nbsp;');
});

Template.registerHelper('upArrow', function(){
    return new Handlebars.SafeString('&#8593;&nbsp;');
});

Template.registerHelper('downArrow', function(){
    return new Handlebars.SafeString('&#8595;&nbsp;');
});

Template.registerHelper('getCopyRightSymbol', function(){
    return new Handlebars.SafeString('&#169;');
});