/*jslint browser:true*/
var Desktop = {
    lastAppPosX : 10,
    lastAppPosY : 10,
    init : function () {
        "use strict";
        var galleryIcon = document.getElementById("gallery-icon"),
            rssIcon = document.getElementById("rss-icon");
        galleryIcon.addEventListener("click", function (e) {
            Desktop.openGalleryApp();
        }, false);
        rssIcon.addEventListener("click", function (e) {
            Desktop.openRssApp();
        }, false);
    },
    openApp : function (title, appClass, appWidth, appHeight) {
        "use strict";
        var desktop = document.getElementById("desktop"),
            iconBar = document.getElementById("icon-bar"),
            appWindow = document.createElement("div"),
            topBar = document.createElement("header"),
            appTitle = document.createElement("h2"),
            titleText = document.createTextNode(title),
            closeApp = document.createElement("button"),
            content = document.createElement("article"),
            statusBar = document.createElement("footer");
        appWindow.classList.add(appClass, "app");
        if ((desktop.clientWidth - appWidth - 10) < Desktop.lastAppPosX) {
            Desktop.lastAppPosX = 10;
        }
        if ((desktop.clientHeight - appHeight - 10 - iconBar.clientHeight) < Desktop.lastAppPosY) {
            Desktop.lastAppPosY = 10;
        }
        appWindow.style.left = Desktop.lastAppPosX + "px";
        appWindow.style.top = Desktop.lastAppPosY + "px";
        appWindow.style.width = appWidth + "px";
        appWindow.style.height = appHeight + "px";
        Desktop.lastAppPosX += 10;
        Desktop.lastAppPosY += 10;
        closeApp.className = "close-app";
        closeApp.addEventListener("click", function () {
            desktop.removeChild(appWindow);
        }, false);
        topBar.appendChild(appTitle).appendChild(titleText);
        topBar.appendChild(closeApp);
        appWindow.appendChild(topBar);
        desktop.appendChild(appWindow);
    },
    openGalleryApp : function () {
        "use strict";
        Desktop.openApp("Image gallery", "gallery-app", 300, 200);
    },
    openRssApp: function () {
        "use strict";
        Desktop.openApp("Rss feed", "rss-app", 200, 280);
    }
};
document.load = Desktop.init();