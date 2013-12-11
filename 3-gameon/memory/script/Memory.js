var Memory = {
    init : function () {
        "use strict";
        var table = Memory.createTable(4, 4);
        Memory.displayGame(table);
    },
    createTable : function (rows, cols) {
        "use strict";
        var pairs = Generator.randomPairs(rows * cols / 2),
            i,
            j,
            table = [];
        for (i = 0; i < rows; i += 1) {
            table[i] = [];
            for (j = 0; j < cols; j += 1) {
                table[i][j] = pairs[i * cols + j];
            }
        }
        return table;
    },
    displayGame : function (positions) {
        "use strict";
        var div = document.getElementById("game"),
            ol,
            li,
            a,
            i,
            j;
        for (i = 0; i < positions.length; i += 1) {
            ol = document.createElement("ol");
            for (j = 0; j < positions[i].length; j += 1) {
                li = document.createElement("li");
                a = Memory.createCard(positions[i][j]);
                ol.appendChild(li).appendChild(a);
            }
            div.appendChild(ol);
        }
    },
    createCard : function (id) {
        "use strict";
        var a,
            img,
            src;
        a = document.createElement("a");
        a.setAttribute("href", "#");
        src = "pics/" + id + ".png";
        a.addEventListener("click", function (e) {
            e.preventDefault();
            if (Memory.timer === null) {
                Memory.flipCard(this.firstChild, src);
            }
        }, false);
        img = document.createElement("img");
        img.setAttribute("src", "pics/0.png");
        img.setAttribute("alt", "En spelbricka");
        a.appendChild(img);
        return a;
    },
    flipCard : function (img, src) {
        "use strict";
        var match,
            timer;
        if (img.getAttribute("src") !== src) {
            if (Memory.flippedCard === null) {
                Memory.flippedCard = img;
                img.setAttribute("src", src);
            } else {
                match = Memory.compareCards(Memory.flippedCard.getAttribute("src"), src);
                img.setAttribute("src", src);
                if (!match) {
                    Memory.timer = window.setTimeout(function () {
                        Memory.flippedCard.setAttribute("src", "pics/0.png");
                        img.setAttribute("src", "pics/0.png");
                        Memory.flippedCard = null;
                        Memory.timer = null;
                    }, 1000);
                } else {
                    Memory.flippedCard = null;
                }
            }
        }
    },
    compareCards : function (src1, src2) {
        "use strict";
        if (src1 === src2) {
            return true;
        } else {
            return false;
        }
    },
    flippedCard : null,
    timer : null
};
window.onload = Memory.init;