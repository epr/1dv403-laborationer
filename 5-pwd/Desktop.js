/*jslint browser:true*/
var Desktop = {
    desktopPadding : 10,
    positionIncrement : 10,
    lastAppPosX : 0,
    lastAppPosY : 0,
    appZ : 0,
    init : function () {
        "use strict";
        document.getElementById("gallery-icon").addEventListener("click", Desktop.openGalleryApp, false);
        document.getElementById("rss-icon").addEventListener("click", Desktop.openRssApp, false);
        document.addEventListener("selectstart", function (e) {
            e.preventDefault();
        }, false);
        Desktop.lastAppPosX = Desktop.desktopPadding;
        Desktop.lastAppPosY = Desktop.desktopPadding;
    },
    openGalleryApp : function () {
        "use strict";
        var startTime = new Date().getTime(),
            loadingTime,
            galleryApp = Desktop.openApp("Image gallery", "gallery-app", 450, 350),
            xhr = new XMLHttpRequest(),
            images,
            i,
            a,
            img,
            maxW = 0,
            maxH = 0,
            loader = setTimeout(function () {
                galleryApp["status"].classList.add("loading");
                galleryApp["status"].appendChild(document.createTextNode("Loading..."));
            }, 300);
        xhr.addEventListener("readystatechange", function () {
            if (xhr.readyState === 4) {
                images = JSON.parse(xhr.responseText);
                for (i = 0; i < images.length; i += 1) {
                    if (images[i].thumbWidth > maxW) {
                        maxW = images[i].thumbWidth;
                    }
                    if (images[i].thumbHeight > maxH) {
                        maxH = images[i].thumbHeight;
                    }
                }
                for (i = 0; i < images.length; i += 1) {
                    a = document.createElement("a");
                    a.setAttribute("href", images[i].URL);
                    a.setAttribute("data-width", images[i].width);
                    a.setAttribute("data-height", images[i].height);
                    a.style.width = maxW + "px";
                    a.style.height = maxH + "px";
                    a.addEventListener("click", Desktop.openImageWindow, false);
                    img = document.createElement("img");
                    img.setAttribute("src", images[i].thumbURL);
                    a.appendChild(img);
                    galleryApp["content"].appendChild(a);
                }
                clearTimeout(loader);
                galleryApp["status"].classList.remove("loading");
                if (galleryApp["status"].firstChild) {
                    galleryApp["status"].removeChild(galleryApp["status"].firstChild);
                }
                loadingTime = new Date().getTime() - startTime;
                galleryApp["status"].appendChild(document.createTextNode(images.length + " images loaded in " + loadingTime + " ms"));
            }
        }, false);
        xhr.open("get", "http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/", true);
        xhr.send();
    },
    openRssApp : function () {
        "use strict";
        var rssApp = Desktop.openApp("Rss feed", "rss-app", 300, 400),
            xhr = new XMLHttpRequest(),
            url = "http://feeds.bbci.co.uk/news/world/rss.xml",
            loader,
            updateTime,
            interval,
            intervalMinutes = 1,
            updateFeed = function () {
                if (document.contains(rssApp["app"])) {
                    loader = setTimeout(function () {
                        rssApp["status"].classList.add("loading");
                        if (rssApp["status"].firstChild) {
                            rssApp["status"].removeChild(rssApp["status"].firstChild);
                        }
                        rssApp["status"].appendChild(document.createTextNode("Updating..."));
                    }, 300);
                    xhr.open("get", "http://homepage.lnu.se/staff/tstjo/labbyServer/rssproxy/?url=" + escape(url), true);
                    xhr.send();
                } else {
                    clearInterval(interval);
                }
            },
            changeInterval = function () {
                clearInterval(interval);
                interval = setInterval(updateFeed, intervalMinutes * 60000);
            },
            openRssMenu = function () {
                var menu = Desktop.openMenu(),
                    menuInterval = document.createElement("button"),
                    menuSource = document.createElement("button"),
                    menuUpdate = document.createElement("button");
                menuInterval.className = "icon-time";
                menuInterval.addEventListener("click", openIntervalMenu, false);
                menu.appendChild(menuInterval).appendChild(document.createTextNode("Update interval..."));
                menuSource.className = "icon-source";
                menuSource.addEventListener("click", openSourceMenu, false);
                menu.appendChild(menuSource).appendChild(document.createTextNode("Source..."));
                menuUpdate.className = "icon-refresh";
                menuUpdate.addEventListener("click", updateFeed, false);
                menu.appendChild(menuUpdate).appendChild(document.createTextNode("Update now"));
                menu.style.left = this.offsetLeft + this.parentNode.parentNode.offsetLeft + this.clientWidth + parseInt(getComputedStyle(this.parentNode.parentNode).getPropertyValue("border-left-width"), 10) - menu.clientWidth + "px";
                menu.style.top = this.offsetTop + this.parentNode.parentNode.offsetTop + this.clientHeight + parseInt(getComputedStyle(this.parentNode.parentNode).getPropertyValue("border-top-width"), 10) + "px";
            },
            openIntervalMenu = function () {
                var menu = Desktop.openMenu(),
                    slider = document.createElement("input"),
                    sliderText = document.createElement("span");
                slider.setAttribute("type", "range");
                slider.setAttribute("min", "1");
                slider.setAttribute("max", "5");
                slider.setAttribute("step", "1");
                slider.setAttribute("value", intervalMinutes);
                slider.addEventListener("change", function () {
                    intervalMinutes = slider.value;
                    changeInterval();
                    sliderText.innerHTML = slider.value + " min";
                }, false);
                sliderText.innerHTML = slider.value + " min";
                menu.appendChild(slider);
                menu.appendChild(sliderText);
                console.log(this.parentNode.parentNode);
                menu.style.left = rssApp["app"].offsetLeft + parseInt(getComputedStyle(rssApp["app"]).getPropertyValue("border-left-width"), 10) + "px";
                menu.style.top = rssApp["app"].offsetTop + rssApp["content"].offsetTop + parseInt(getComputedStyle(rssApp["app"]).getPropertyValue("border-top-width"), 10) + "px";
                menu.style.width = rssApp["app"].clientWidth - 20 + "px";
                menu.className = "slider-menu";
            },
            openSourceMenu = function () {
                var menu = Desktop.openMenu();
                menu.addEventListener("click", function (e) {
                    //e.stopPropagation();
                }, false);
                    menu.style.background = "red";
                    menu.style.width = "100px";
                    menu.style.height = "100px";
            };
        xhr.addEventListener("readystatechange", function () {
            if (xhr.readyState === 4) {
                rssApp["content"].innerHTML = xhr.responseText;
                clearTimeout(loader);
                rssApp["status"].classList.remove("loading");
                if (rssApp["status"].firstChild) {
                    rssApp["status"].removeChild(rssApp["status"].firstChild);
                }
                updateTime = new Date();
                rssApp["status"].appendChild(document.createTextNode("Last updated " + Desktop.leadingZero(updateTime.getHours()) + ":" + Desktop.leadingZero(updateTime.getMinutes()) + ":" + Desktop.leadingZero(updateTime.getSeconds())));
            }
        }, false);
        rssApp["menu"].addEventListener("click", openRssMenu, false);
        updateFeed();
        changeInterval(1);
    },
    openMenu : function () {
        "use strict";
        var cover = document.createElement("div"),
            menu = document.createElement("menu"),
            desktop = document.getElementById("desktop");
        cover.style.position = "absolute";
        cover.style.top = "0px";
        cover.style.left = "0px";
        cover.style.width = desktop.clientWidth + "px";
        cover.style.height = desktop.clientHeight + "px";
        cover.style.zIndex = 10000;
        cover.addEventListener("click", function () {
            desktop.removeChild(cover);
        }, false);
        cover.appendChild(menu);
        desktop.appendChild(cover);
        return menu;
    },
    openImageWindow : function (e) {
        "use strict";
        e.preventDefault();
        var imageWindow = Desktop.openApp("Image", "image", this.getAttribute("data-width"), +this.getAttribute("data-height") + 64),
            img = document.createElement("img");
        img.setAttribute("src", this.href);
        imageWindow["content"].appendChild(img);
    },
    openApp : function (title, appClass, appWidth, appHeight) {
        "use strict";
        var desktop = document.getElementById("desktop"),
            iconBar = document.getElementById("icon-bar"),
            appWindow = document.createElement("div"),
            topBar = document.createElement("header"),
            appTitle = document.createElement("h2"),
            titleText = document.createTextNode(title),
            contextMenu = document.createElement("button"),
            maximizeApp = document.createElement("button"),
            closeApp = document.createElement("button"),
            content = document.createElement("article"),
            statusBar = document.createElement("footer"),
            statusText = document.createElement("p"),
            resizeApp = document.createElement("button");
        appWindow.classList.add(appClass, "app");
        if ((desktop.clientWidth - appWidth - Desktop.desktopPadding) < Desktop.lastAppPosX) {
            Desktop.lastAppPosX = Desktop.desktopPadding;
        }
        if ((desktop.clientHeight - appHeight - Desktop.desktopPadding - iconBar.clientHeight) < Desktop.lastAppPosY) {
            Desktop.lastAppPosY = Desktop.desktopPadding;
            if (Desktop.lastAppPosY + appHeight + Desktop.desktopPadding > desktop.clientHeight - iconBar.clientHeight) {
                appHeight = desktop.clientHeight - Desktop.lastAppPosY - Desktop.desktopPadding - iconBar.clientHeight;
            }
        }
        appWindow.style.left = Desktop.lastAppPosX + "px";
        appWindow.style.top = Desktop.lastAppPosY + "px";
        appWindow.style.width = appWidth + "px";
        appWindow.style.height = appHeight + "px";
        appWindow.addEventListener("mousedown", Desktop.bringToFront, false);
        Desktop.lastAppPosX += Desktop.positionIncrement;
        Desktop.lastAppPosY += Desktop.positionIncrement;
        contextMenu.className = "icon-menu"
        maximizeApp.className = "icon-expand";
        maximizeApp.addEventListener("click", Desktop.maximizeApp, false);
        closeApp.className = "icon-close";
        closeApp.addEventListener("click", Desktop.closeApp, false);
        topBar.appendChild(appTitle).appendChild(titleText);
        topBar.appendChild(closeApp);
        topBar.appendChild(maximizeApp);
        topBar.appendChild(contextMenu);
        topBar.addEventListener("mousedown", Desktop.moveApp, false);
        resizeApp.className = "icon-resize";
        resizeApp.addEventListener("mousedown", Desktop.resizeApp, false);
        statusBar.appendChild(statusText);
        statusBar.appendChild(resizeApp);
        appWindow.appendChild(topBar);
        appWindow.appendChild(content);
        appWindow.appendChild(statusBar);
        desktop.appendChild(appWindow);
        Desktop.bringToFront.call(appWindow); //brins the app window to the front by passing it as "this"
        return {"app" : appWindow, "content" : content, "status" : statusText, "menu" : contextMenu};
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
            verticalBorders = parseInt(getComputedStyle(draggedElement).getPropertyValue("border-left-width"), 10) + parseInt(getComputedStyle(draggedElement).getPropertyValue("border-right-width"), 10),
            horizontalBorders = parseInt(getComputedStyle(draggedElement).getPropertyValue("border-top-width"), 10) + parseInt(getComputedStyle(draggedElement).getPropertyValue("border-bottom-width"), 10),
            maxLeft = draggedElement.parentNode.clientWidth - draggedElement.clientWidth - verticalBorders,
            maxTop = draggedElement.parentNode.clientHeight - draggedElement.clientHeight - document.getElementById("icon-bar").clientHeight - horizontalBorders,
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
            verticalBorders = parseInt(getComputedStyle(resizedElement).getPropertyValue("border-left-width"), 10) + parseInt(getComputedStyle(resizedElement).getPropertyValue("border-right-width"), 10),
            horizontalBorders = parseInt(getComputedStyle(resizedElement).getPropertyValue("border-top-width"), 10) + parseInt(getComputedStyle(resizedElement).getPropertyValue("border-bottom-width"), 10),
            maxWidth = resizedElement.parentNode.clientWidth - resizedElement.offsetLeft - verticalBorders,
            maxHeight = resizedElement.parentNode.clientHeight - resizedElement.offsetTop - document.getElementById("icon-bar").clientHeight - horizontalBorders,
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
    },
    leadingZero : function (number) {
        "use strict";
        if (number < 10) {
            number = "0" + number;
        }
        return number;
    }
};
document.load = Desktop.init();