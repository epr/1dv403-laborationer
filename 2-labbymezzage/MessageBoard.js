"use strict";
var MessageBoard = {
    messages : [],
    init : function (e) {
        var textArea = document.getElementById("input");
        document.getElementById("send").addEventListener("click", function () {
            MessageBoard.messages.push(new Message(textArea.value, new Date()));
            MessageBoard.renderMessages();
        }, false);
        textArea.addEventListener("keydown", function (e) {
            if ((e.keyCode === 13) && !e.shiftKey) {
                e.preventDefault();
                MessageBoard.messages.push(new Message(textArea.value, new Date()));
                MessageBoard.renderMessages();
            }
        }, false);
        MessageBoard.updateCounter();
    },
    renderMessages : function () {
        var i;
        document.getElementById("input").value = "";
        document.getElementById("messages").innerHTML = "";
        for (i = 0; i < MessageBoard.messages.length; i++) {
            MessageBoard.renderMessage(i);
        }
        MessageBoard.updateCounter();
    },
    renderMessage : function (messageId) {
        var article = document.createElement("article"),
            p = document.createElement("p"),
            close = document.createElement("button"),
            clock = document.createElement("button"),
            timeStamp = document.createElement("time"),
            time = document.createTextNode(MessageBoard.messages[messageId].getDate().getHours() + ":" + MessageBoard.messages[messageId].getDate().getMinutes() + ":" + MessageBoard.messages[messageId].getDate().getSeconds()),
            dateTime = MessageBoard.messages[messageId].getDate();
        close.className = "close";
        close.setAttribute("title", "close");
        close.addEventListener("click", function () {
            if (window.confirm("Vill du verkligen radera meddelandet?")) {
                MessageBoard.removeMessage(messageId);
            }
        }, false);
        clock.className = "clock";
        clock.setAttribute("title", "show time");
        clock.addEventListener("click", function () {
            alert(MessageBoard.messages[messageId].getDateText());
        }, false);
        article.appendChild(close);
        article.appendChild(clock);
        p.innerHTML = MessageBoard.messages[messageId].getHTMLText();
        document.getElementById("messages").appendChild(article).appendChild(p);
        timeStamp.setAttribute("datetime", dateTime.getHours() + ":" + dateTime.getMinutes() + ":" + dateTime.getSeconds());
        article.appendChild(timeStamp).appendChild(time);
    },
    removeMessage : function (messageId) {
        MessageBoard.messages.splice(messageId, 1);
        MessageBoard.renderMessages();
    },
    updateCounter : function () {
        var counter = document.createElement("p"),
            countertext = document.createTextNode("Antal meddelanden: " + MessageBoard.messages.length);
        document.getElementById("messages").appendChild(counter).appendChild(countertext);
    }
};

window.onload = MessageBoard.init;