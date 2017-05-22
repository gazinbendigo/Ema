/**
 * Created by adm9360 on 21/02/2017.
 */

var pageSession = new ReactiveDict();

Template.signin.onCreated(function(){
    this.loginBttnTxt = new ReactiveVar("Sign in");
    pageSession.set("errorMessage", "");
});

Template.signin.helpers({
    errorMessage() {
        return pageSession.get("errorMessage");
    },

    getLoginBttTxt() {
        return Template.instance().loginBttnTxt.get();
    }
});

Template.signin.onRendered(function() {
    this.find('#inputAdm').focus();
});

Template.signin.events({

    "submit #loginForm": (event, template) => {
        event.preventDefault();
        ////////////////////////////////////////////////////////
        /// The jquery way below works, but did not work on the reset button?? Ill leave it here for doco purposes for now.
        //let submit_button = $(template.find(":submit"));
        //submit_button.button("loading");
        pageSession.set("errorMessage", "");

        let userName = template.find('#inputAdm').value.trim();
        if(!isValidAdmNumber(userName)){
            pageSession.set("errorMessage", "Invalid Adm number.");
            template.find('#inputAdm').focus();
            return false;
        }

        let pwd = template.find('#inputPassword').value.trim();
        if(!isValidString(pwd, 6)){
            pageSession.set("errorMessage", "Invalid Username or Password.");
            template.find('#inputPassword').focus();
            return false;
        }

        template.loginBttnTxt.set("loading...");
        Meteor.loginWithPassword(userName, pwd, function(err) {
            if (err)
            {
                pageSession.set("errorMessage", "Invalid Username or Password.");
                template.loginBttnTxt.set("Try again");
                return false;
            }
            else {
                console.log(Meteor.user());
                FlowRouter.go("/landing");
            }
        });
    },

    "click #resetBttn": function(event, template) {
        event.preventDefault();
        pageSession.set("errorMessage", "");
        template.find("form").reset();
        template.find('#inputAdm').focus();
        template.loginBttnTxt.set("Sign in");
    }
});

