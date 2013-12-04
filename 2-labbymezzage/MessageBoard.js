var MessageBoard = {
    messages : [],
    init : function(e){
        var mess = new Message("test", new Date());
        MessageBoard.messages.push(mess);
        MessageBoard.renderMessages();
    },
    renderMessages : function() {
        document.getElementById("messages").innerHTML = "";
        for (var i = 0; i < MessageBoard.messages.length; i++) {
            MessageBoard.renderMessage(i);
        }
    },
    renderMessage : function(messageId) {
        var article = document.createElement("article");
        var p = document.createElement("p");
        var text = document.createTextNode(MessageBoard.messages[messageId].getText());
        document.getElementById("messages").appendChild(article).appendChild(p).appendChild(text);
    }
};

window.onload = MessageBoard.init;