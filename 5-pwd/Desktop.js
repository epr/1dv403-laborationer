var Desktop = {
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
    openApp : function (title, appClass) {
        "use strict";
        var desktop = document.getElementById("desktop"),
            appWindow = document.createElement("div"),
            titleBar = document.createElement("header"),
            appTitle = document.createElement("h2"),
            titleText = document.createTextNode(title);
        appWindow.classList.add(appClass, "app");
        desktop.appendChild(appWindow).appendChild(titleBar).appendChild(appTitle).appendChild(titleText);
    },
    openGalleryApp : function () {
        Desktop.openApp("Image gallery", "gallery-app");
    },
    openRssApp: function () {
        Desktop.openApp("Rss feed", "rss-app");
    }
};
document.load = Desktop.init();