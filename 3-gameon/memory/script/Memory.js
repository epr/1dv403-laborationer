var Memory = {
    init : function () {
        "use strict";
        var table = Memory.createTable(4, 4),
            images = ["❤", "☀", "★", "☂", "♞", "☯", "☭", "☢", "☎", "⚑", "❄", "♫", "✂", "☕", "✎"],
            div = document.getElementById("game"),
            ol,
            li,
            i,
            j;
        for (i = 0; i < table.length; i += 1) {
            console.log(table[i]);
            ol = document.createElement("ol");
            for (j = 0; j < table[i].length; j += 1) {
                li = document.createElement("li");
                li.innerHTML = images[table[i][j]];
                ol.appendChild(li);
            }
            div.appendChild(ol);
        }
    },
    createTable : function (rows, cols) {
        "use strict";
        var pairs = Generator.randomPairs(rows * cols / 2),
            i,
            j,
            table = [];
        console.log(pairs);
        for (i = 0; i < rows; i += 1) {
            table[i] = [];
            for (j = 0; j < cols; j += 1) {
                table[i][j] = pairs[i * cols + j];
            }
        }
        return table;
    }
};
window.onload = Memory.init;