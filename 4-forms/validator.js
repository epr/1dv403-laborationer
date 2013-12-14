var validator = {
    init : function () {
        "use strict";
        var submit = document.getElementById("submit"),
            name = document.getElementById("name"),
            surname = document.getElementById("surname"),
            code = document.getElementById("code"),
            email = document.getElementById("email");
        submit.addEventListener("click", function (e) {
            e.preventDefault();
            validator.validateForm();
        }, false);
        name.addEventListener("blur", function () {
            validator.validateName(name);
        }, false);
        surname.addEventListener("blur", function () {
            validator.validateName(surname);
        }, false);
        code.addEventListener("blur", function () {
            validator.validateCode(code);
        }, false);
        email.addEventListener("blur", function () {
            validator.validateEmail(email);
        }, false);
    },
    validateForm : function () {
        "use strict";
    },
    validateName : function (field) {
        "use strict";
        if (field.value === "") {
            console.log("enter something");
        }
    },
    validateCode : function (field) {
        "use strict";
    },
    validateEmail : function (field) {
        "use strict";
    }
};
document.onload = validator.init();