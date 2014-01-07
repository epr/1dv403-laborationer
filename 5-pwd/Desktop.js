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
    openGalleryApp : function () {
        "use strict";
        var galleryApp = Desktop.openApp("Image gallery", "gallery-app", 300, 200),
            xhr = new XMLHttpRequest(),
            images,
            i,
            a,
            img;
        xhr.addEventListener("readystatechange", function () {
            if (xhr.readyState === 4) {
                images = JSON.parse(xhr.responseText);
                for (i = 0; i < images.length; i += 1) {
                    a = document.createElement("a");
                    a.setAttribute("href", images[i].URL);
                    img = document.createElement("img");
                    img.setAttribute("src", images[i].thumbURL);
                    a.appendChild(img);
                    galleryApp.content.appendChild(a);
                }
            }
        }, false);
        xhr.open("get", "http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/", true);
        xhr.send();
    },
    openRssApp : function () {
        "use strict";
        var rssApp = Desktop.openApp("Rss feed", "rss-app", 200, 280);
        console.log(rssApp.content);
        console.log(rssApp.footer);
    },
    openApp : function (title, appClass, appWidth, appHeight) {
        "use strict";
        var desktop = document.getElementById("desktop"),
            iconBar = document.getElementById("icon-bar"),
            appWindow = document.createElement("div"),
            topBar = document.createElement("header"),
            appTitle = document.createElement("h2"),
            titleText = document.createTextNode(title),
            maximizeApp = document.createElement("button"),
            closeApp = document.createElement("button"),
            content = document.createElement("article"),
            statusBar = document.createElement("footer"),
            resizeApp = document.createElement("button");
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
        maximizeApp.className = "icon-expand";
        maximizeApp.addEventListener("click", Desktop.maximizeApp, false);
        closeApp.className = "icon-close";
        closeApp.addEventListener("click", Desktop.closeApp, false);
        topBar.appendChild(appTitle).appendChild(titleText);
        topBar.appendChild(closeApp);
        topBar.appendChild(maximizeApp);
        topBar.addEventListener("mousedown", Desktop.moveApp, false);
        resizeApp.className = "icon-resize";
        resizeApp.addEventListener("mousedown", Desktop.resizeApp, false);
        statusBar.appendChild(resizeApp);
        appWindow.appendChild(topBar);
        appWindow.appendChild(content);
        appWindow.appendChild(statusBar);
        desktop.appendChild(appWindow);
        Desktop.bringToFront.call(appWindow); //brins the app window to the front by passing it as "this"
        return {"app" : appWindow, "content" : content, "footer" : statusBar};
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
            Desktop.appZ = 0;
        }
    },
    maximizeApp : function () {
        "use strict";
        var app = this.parentNode.parentNode,
            appWidth = app.clientWidth,
            appHeight = app.clientHeight,
            appLeft = app.offsetLeft,
            appTop = app.offsetTop,
            unmaximizeApp = function () {
                app.style.left = appLeft + "px";
                app.style.top = appTop + "px";
                app.style.width = appWidth + "px";
                app.style.height = appHeight + "px";
                this.removeEventListener("click", unmaximizeApp, false);
                this.addEventListener("click", Desktop.maximizeApp, false);
                this.parentNode.addEventListener("mousedown", Desktop.moveApp, false);
                this.className = "icon-expand";
                app.classList.remove("maximized");
            };
        this.removeEventListener("click", Desktop.maximizeApp, false);
        this.addEventListener("click", unmaximizeApp, false);
        this.parentNode.removeEventListener("mousedown", Desktop.moveApp, false);
        this.className = "icon-contract";
        app.style.left = "0px";
        app.style.top = "0px";
        app.style.width = app.parentNode.clientWidth + "px";
        app.style.height = app.parentNode.clientHeight - document.getElementById("icon-bar").clientHeight + "px";
        app.classList.add("maximized");
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
    },
    resizeApp : function (event) {
        "use strict";
        var resizedElement = this.parentNode.parentNode,
            xDiff = resizedElement.clientWidth - event.clientX,
            yDiff = resizedElement.clientHeight - event.clientY,
            maxWidth = resizedElement.parentNode.clientWidth - resizedElement.offsetLeft,
            maxHeight = resizedElement.parentNode.clientHeight - resizedElement.offsetTop - document.getElementById("icon-bar").clientHeight,
            resizeTheApp = function (e) {
                if (e.clientX + xDiff > 200) {
                    if (e.clientX + xDiff < maxWidth) {
                        resizedElement.style.width = (e.clientX + xDiff) + "px";
                    } else {
                        resizedElement.style.width = maxWidth + "px";
                    }
                } else {
                    resizedElement.style.width = "200px";
                }
                if (e.clientY + yDiff > 200) {
                    if (e.clientY + yDiff < maxHeight) {
                        resizedElement.style.height = (e.clientY + yDiff) + "px";
                    } else {
                        resizedElement.style.height = maxHeight + "px";
                    }
                } else {
                    resizedElement.style.height = "200px";
                }
            },
            leaveApp = function () {
                resizedElement.classList.remove("resizing");
                document.removeEventListener("mousemove", resizeTheApp, false);
                document.removeEventListener("mouseup", leaveApp, false);
            };
        resizedElement.classList.add("resizing");
        document.addEventListener("mousemove", resizeTheApp, false);
        document.addEventListener("mouseup", leaveApp, false);
    }
};
document.load = Desktop.init();