/**
 * Created by adm9360 on 21/02/2017.
 */

var pageSession = new ReactiveDict();

Template.signin.onCreated(function(){

    pageSession.set("errorMessage", "");
});

Template.signin.helpers({
    errorMessage: function() {
        return pageSession.get("errorMessage");
    }
});

Template.signin.events({

    "submit #loginForm": (event, template) => {
        event.preventDefault();
        let submit_button = $(template.find(":submit"));

        pageSession.set("errorMessage", "");

        let userName = template.find('#inputAdm').value.trim();
        if(!isValidAdmNumber(userName)){
            pageSession.set("errorMessage", "Invalid Adm number.");
            template.find('#inputAdm').focus();
            return false;
        }

        let pwd = template.find('#inputPassword').value.trim();
        if(!isValidString(pwd, 6)){
            pageSession.set("errorMessage", "Invalid Password.");
            template.find('#inputPassword').focus();
            return false;
        }

        submit_button.button("loading");
        Meteor.loginWithPassword(userName, pwd, function(err) {
            if (err)
            {
                pageSession.set("errorMessage", err.message);
                submit_button.button("Try again");
                return false;
            }
            else {
                console.log(Meteor.user());
                FlowRouter.go("/landing");
            }
        });
        return false;
    }
});

