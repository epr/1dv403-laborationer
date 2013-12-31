/*jslint browser:true*/
var Desktop = {
    lastAppPosX : 10,
    lastAppPosY : 10,
    appZ : 0,
    init : function () {
        "use strict";
        document.getElementById("gallery-icon").addEventListener("click", Desktop.openGalleryApp, false);
        document.getElementById("rss-icon").addEventListener("click", Desktop.openRssApp, false);
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
        appWindow.addEventListener("mousedown", Desktop.bringToFront, false);
        Desktop.lastAppPosX += 10;
        Desktop.lastAppPosY += 10;
        closeApp.className = "close-app";
        closeApp.addEventListener("click", Desktop.closeApp, false);
        topBar.appendChild(appTitle).appendChild(titleText);
        topBar.appendChild(closeApp);
        topBar.addEventListener("mousedown", Desktop.moveApp, false);
        appWindow.appendChild(topBar);
        appWindow.appendChild(content);
        appWindow.appendChild(statusBar);
        desktop.appendChild(appWindow);
        Desktop.bringToFront.call(appWindow); //brins the app window to the front by passing it as "this"
        return appWindow;
    },
    openGalleryApp : function () {
        "use strict";
        var galleryApp = Desktop.openApp("Image gallery", "gallery-app", 300, 200);
    },
    openRssApp : function () {
        "use strict";
        var RssApp = Desktop.openApp("Rss feed", "rss-app", 200, 280);
    },
    bringToFront : function () { //brings the selected application window to the top
        "use strict";
        Desktop.appZ += 1; //increases the z index counter
        this.style.zIndex = Desktop.appZ; //updates the z index of the application window
    },
    closeApp : function () {
        "use strict";
        this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
        if (document.getElementsByClassName("app").length === 0) {
            Desktop.lastAppPosX = 10;
            Desktop.lastAppPosY = 10;
        }
    },
    moveApp : function (event) { //prepares to move the app
        "use strict";
        var draggedElement = this.parentNode, //saves the dragged element to be referenced when moving
            xDiff = event.clientX - draggedElement.offsetLeft, //saves the difference between the position of the window's left edge and the place where the mouse is holding the window on the x axis
            yDiff = event.clientY - draggedElement.offsetTop, //saves the difference between the position of the window's top edge and the place where the mouse is holding the window on the y axis
            maxLeft = draggedElement.parentNode.clientWidth - draggedElement.clientWidth,
            maxTop = draggedElement.parentNode.clientHeight - draggedElement.clientHeight - document.getElementById("icon-bar").clientHeight,
            moveTheApp = function (e) { //moves the app when the mouse is dragging it
                if (e.clientX - xDiff > 0) {
                    if (e.clientX - xDiff < maxLeft) {
                        draggedElement.style.left = (e.clientX - xDiff) + "px"; //moves the application window on the x axis when the mouse moves on the x axis
                    } else {
                        draggedElement.style.left = maxLeft + "px";
                    }
                } else {
                    draggedElement.style.left = "0px";
                }
                if (e.clientY - yDiff > 0) {
                    if (e.clientY - yDiff < maxTop) {
                        draggedElement.style.top = (e.clientY - yDiff) + "px"; //moves the application window on the y axis when the mouse moves on the y axis
                    } else {
                        draggedElement.style.top = maxTop + "px";
                    }
                } else {
                    draggedElement.style.top = "0px";
                }
            },
            stopApp = function () { //stops the app from moving when the user drops the application window
                draggedElement.classList.remove("moving");
                document.removeEventListener("mousemove", moveTheApp, false); //removes the move event listener from the document
                document.removeEventListener("mouseup", stopApp, false); //removes the drop event listener from the application window menubar
            };
        draggedElement.classList.add("moving");
        document.addEventListener("mousemove", moveTheApp, false); //listens when the user moves the mouse in the document
        document.addEventListener("mouseup", stopApp, false); //listens for when the user drops the application window
    }
};
document.load = Desktop.init();