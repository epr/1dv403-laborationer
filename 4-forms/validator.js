/*jslint browser:true*/
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
            var nameCheck = validator.validateName(name),
                surnameCheck = validator.validateName(surname),
                codeCheck = validator.validateCode(code);
            if (nameCheck && surnameCheck && codeCheck) {
                validator.showModal(form);
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
        var value = field.value;
        if (value.length === 6) {
            if (value.indexOf("-") === 3) { // XXX-XX
                value = value.split("-").join("");
            } else if (value.indexOf(" ") === 3) { // XXX XX
                value = value.split(" ").join("");
            }
        } else if (value.indexOf("SE") === 0) {
            value = value.split("SE")[1]; // SEXXXXX
            if (value.length === 6) {
                if (value.indexOf("-") === 3) { // SEXXX-XX
                    value = value.split("-").join("");
                } else if ((value.indexOf(" ") === 3) || (value.indexOf(" ") === 0)) { // SEXXX XX || SE XXXXX
                    value = value.split(" ").join("");
                }
            } else if ((value.length === 7) && (value.indexOf(" ") === 0)) {
                if (value.indexOf("-") === 4) { // SE XXX-XX
                    value = value.split(" ")[1].split("-").join("");
                } else if (value.lastIndexOf(" ") === 4) { // SE XXX XX
                    value = value.split(" ").join("");
                }
            }
        }
        if ((value.length === 5) && (value > 9999)) { // XXXXX
            validator.changeField(field, value);
            validator.passField(field);
            return true;
        } else {
            validator.failField(field, "Du måste ange ett giltigt postnummer");
            return false;
        }
    },
    validateEmail : function (field) {
        "use strict";
        var value = field.value;
        if (value.split("@").length === 2) {
            validator.passField(field);
            return true;
        } else {
            validator.failField(field, "Du måste ange en giltig e-postadress");
            return false;
        }
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
    },
    changeField : function (field, newValue) {
        "use strict";
        field.value = newValue;
    },
    showModal : function (form) {
        "use strict";
        var cover = document.createElement("div"),
            modal = document.createElement("div"),
            h2 = document.createElement("h2"),
            title = document.createTextNode("Vänligen bekräfta ditt köp"),
            close = document.createElement("button"),
            table = document.createElement("table"),
            tr,
            th,
            td,
            nameLabel = document.createTextNode(document.getElementById("name").getAttribute("name") + ":"),
            name = document.createTextNode(document.getElementById("name").value),
            surnameLabel = document.createTextNode(document.getElementById("surname").getAttribute("name") + ":"),
            surname = document.createTextNode(document.getElementById("surname").value),
            codeLabel = document.createTextNode(document.getElementById("code").getAttribute("name") + ":"),
            code = document.createTextNode(document.getElementById("code").value),
            emailLabel = document.createTextNode(document.getElementById("email").getAttribute("name") + ":"),
            email = document.createTextNode(document.getElementById("email").value),
            priceLabel = document.createTextNode(document.getElementById("price").getAttribute("name") + ":"),
            price = document.createTextNode(document.getElementById("price").value),
            footer = document.createElement("div"),
            send = document.createElement("button"),
            confirm = document.createTextNode("Bekräfta ditt köp"),
            cancel = document.createElement("button"),
            cancelText = document.createTextNode("Avbryt");
        cover.className = "cover";
        modal.className = "modal";
        close.className = "close";
        close.addEventListener("click", function () {
            document.body.removeChild(cover);
            document.body.removeChild(modal);
        }, false);
        document.body.appendChild(cover);
        modal.appendChild(close);
        modal.appendChild(h2).appendChild(title);
        tr = document.createElement("tr");
        th = document.createElement("th");
        td = document.createElement("td");
        th.appendChild(nameLabel);
        td.appendChild(name);
        tr.appendChild(th);
        tr.appendChild(td);
        table.appendChild(tr);
        tr = document.createElement("tr");
        th = document.createElement("th");
        td = document.createElement("td");
        th.appendChild(surnameLabel);
        td.appendChild(surname);
        tr.appendChild(th);
        tr.appendChild(td);
        table.appendChild(tr);
        tr = document.createElement("tr");
        th = document.createElement("th");
        td = document.createElement("td");
        th.appendChild(codeLabel);
        td.appendChild(code);
        tr.appendChild(th);
        tr.appendChild(td);
        table.appendChild(tr);
        tr = document.createElement("tr");
        th = document.createElement("th");
        td = document.createElement("td");
        th.appendChild(emailLabel);
        td.appendChild(email);
        tr.appendChild(th);
        tr.appendChild(td);
        table.appendChild(tr);
        tr = document.createElement("tr");
        th = document.createElement("th");
        td = document.createElement("td");
        th.appendChild(priceLabel);
        td.appendChild(price);
        tr.appendChild(th);
        tr.appendChild(td);
        table.appendChild(tr);
        modal.appendChild(table);
        send.className = "send";
        send.appendChild(confirm);
        send.addEventListener("click", function () {
            form.submit();
        }, false);
        cancel.className = "cancel";
        cancel.appendChild(cancelText);
        cancel.addEventListener("click", function () {
            document.body.removeChild(cover);
            document.body.removeChild(modal);
        }, false);
        footer.appendChild(send);
        footer.appendChild(cancel);
        modal.appendChild(footer);
        document.body.appendChild(modal);
    }
};
document.onload = validator.init();