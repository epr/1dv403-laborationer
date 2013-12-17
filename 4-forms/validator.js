var validator = {
    init : function () {
        "use strict";
        var form = document.getElementById("form"),
            submit = document.getElementById("send"),
            name = document.getElementById("name"),
            surname = document.getElementById("surname"),
            code = document.getElementById("code"),
            email = document.getElementById("email");
        submit.addEventListener("click", function (e) {
            e.preventDefault();
            if (validator.validateName(name) && validator.validateName(surname)) {
                form.submit();
            }
            validator.validateCode(code);
            validator.validateEmail(email);
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
    validateName : function (field) {
        "use strict";
        if (field.value === "") {
            validator.failField(field, "Detta fält får inte lämnas blankt");
            return false;
        } else {
            validator.passField(field);
            return true;
        }
    },
    validateCode : function (field) {
        "use strict";
    },
    validateEmail : function (field) {
        "use strict";
    },
    failField : function (field, text) {
        "use strict";
        var error,
            message;
        if (field.nextElementSibling.tagName !== "P") {
            error = document.createElement("p");
            message = document.createTextNode(text);
            error.appendChild(message);
            field.parentNode.insertBefore(error, field.nextSibling);
            field.className = "fail";
        }
    },
    passField : function (field) {
        "use strict";
        field.className = "pass";
        if (field.nextElementSibling.tagName === "P") {
            field.parentNode.removeChild(field.nextElementSibling);
        }
    }
};
document.onload = validator.init();