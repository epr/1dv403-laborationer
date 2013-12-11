/*jslint browser:true*/
var Memory = {
    rows : 4,
    cols : 4,
    one : 0,
    two : 0,
    turn : 1,
    init : function () {
        "use strict";
        var table,
            button = document.getElementById("new"),
            scoreBoard = document.getElementById("score");
        if ((Memory.rows * Memory.cols < 17) && (Memory.rows * Memory.cols % 2 === 0)) {
            table = Memory.createTable(Memory.rows, Memory.cols);
            Memory.displayGame(table);
        } else {
            throw new Error("Change rows or cols.");
        }
        button.addEventListener("click", function () {
            Memory.init();
        }, false);
        Memory.one = 0;
        Memory.two = 0;
        Memory.turn = 1;
        Memory.updateScore();
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
        div.innerHTML = "";
        for (i = 0; i < positions.length; i += 1) {
            ol = document.createElement("ol");
            for (j = 0; j < positions[i].length; j += 1) {
                li = document.createElement("li");
                a = Memory.createCard(positions[i][j]);
                ol.appendChild(li).appendChild(a);
            }
            div.appendChild(ol);
        }
        Memory.updateScore();
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
            timer,
            aside = document.getElementById("score");
        if (img.getAttribute("src") !== src) {
            if (Memory.flippedCard === null) {
                Memory.flippedCard = img;
                img.setAttribute("src", src);
            } else {
                match = Memory.compareCards(Memory.flippedCard.getAttribute("src"), src);
                img.setAttribute("src", src);
                if (!match) {
                    if (Memory.turn === 1) {
                        Memory.turn = 2;
                        
                    } else {
                        Memory.turn = 1;
                    }
                    Memory.timer = window.setTimeout(function () {
                        Memory.flippedCard.setAttribute("src", "pics/0.png");
                        img.setAttribute("src", "pics/0.png");
                        Memory.flippedCard = null;
                        Memory.timer = null;
                        Memory.updateScore();
                    }, 500);
                } else {
                    Memory.flippedCard.className = "found";
                    img.className = "found";
                    Memory.found += 2;
                    Memory.flippedCard = null;
                    if (Memory.turn === 1) {
                        Memory.one += 1;
                    } else {
                        Memory.two += 1;
                    }
                    Memory.updateScore();
                    if (Memory.found === Memory.rows * Memory.cols) {
                        if (Memory.one > Memory.two) {
                            aside.getElementsByTagName("h2")[0].innerHTML = "Player 1 wins!";
                        } else if (Memory.two > Memory.one) {
                            aside.getElementsByTagName("h2")[1].innerHTML = "Player 2 wins!";
                        } else {
                            aside.innerHTML = "It's a tie.";
                        }
                        timer = window.setTimeout(Memory.init, 2000);
                    }
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
    timer : null,
    found : 0,
    updateScore : function () {
        "use strict";
        var aside = document.getElementById("score"),
            h2,
            p;
        aside.innerHTML = "";
        h2 = document.createElement("h2");
        h2.innerHTML = "Player 1";
        if (Memory.turn === 1) {
            h2.className = "current";
        }
        p = document.createElement("p");
        p.innerHTML = Memory.one;
        aside.appendChild(h2);
        aside.appendChild(p);
        h2 = document.createElement("h2");
        h2.innerHTML = "Player 2";
        if (Memory.turn === 2) {
            h2.className = "current";
        }
        p = document.createElement("p");
        p.innerHTML = Memory.two;
        aside.appendChild(h2);
        aside.appendChild(p);
    }
};
window.onload = Memory.init;