/**
 * Created by adm9360 on 2/12/2016.
 */

"use strict";
    //notAllowed = 18;

    var person = {
        firstName: "Gareth",
        lastName: "Baker",
        printFullName: function(){
            console.log(this.firstName + " " + this.lastName);
        }

    }

    person.printFullName();
