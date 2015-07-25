// LICENSE : MIT
"use strict";
var app = require('app');
var BrowserWindow = require('browser-window');
var path = require("path");
function launchRegisterView() {
    var mainWindow = new BrowserWindow({width: 400, height: 400});
    mainWindow.loadUrl('file://' + __dirname + '/index.html');
    mainWindow.webContents.on('did-finish-load', function () {
    });
    mainWindow.on('closed', function () {
        mainWindow = null;
        app.quit();
    });
}
app.on('window-all-closed', function () {
    if (process.platform != 'darwin') {
        app.quit();
    }
});
app.on('ready', function () {
    launchRegisterView();
});
