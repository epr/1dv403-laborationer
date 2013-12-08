"use strict";
function Message(message, date) {
    this.getText = function () {
        return message;
    };
    this.setText = function (_text) {
        message = _text;
    };
    this.getDate = function () {
        return date;
    };
    this.setDate = function (_date) {
        date = _date;
    };
}
Message.prototype.toString = function () {
    return this.getText() + " (" + this.getDate() + ")";
};
Message.prototype.getHTMLText = function () {
    return this.getText().replace(/[\n\r]/g, "<br>");
};
Message.prototype.getDateText = function () {
    var month;
    switch (this.getDate().getMonth()) {
        case 0:
            month = "januari";
            break;
        case 1:
            month = "februari";
            break;
        case 2:
            month = "mars";
            break;
        case 3:
            month = "april";
            break;
        case 4:
            month = "maj";
            break;
        case 5:
            month = "juni";
            break;
        case 6:
            month = "juli";
            break;
        case 7:
            month = "augusti";
            break;
        case 8:
            month = "september";
            break;
        case 9:
            month = "oktober";
            break;
        case 10:
            month = "november";
            break;
        case 11:
            month = "december";
            break;
    }
    return "Inlägget skapades den " + this.getDate().getDate() + " " + month + " " + this.getDate().getFullYear() + " klockan " + this.getDate().getHours() + ":" + this.getDate().getMinutes() + ":" + this.getDate().getSeconds();
};