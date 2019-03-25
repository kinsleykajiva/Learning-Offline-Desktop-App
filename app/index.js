'use strict';
const electron = require('electron');
const url      = require('url');
const path     = require('path');
const app      = electron.app;
// console.log();
// const BrowserWindow = electron.BrowserWindow;
// let client = require('electron-connect').client;
// Prevent window being garbage collected
let mainWindow;

function onClosed() {
    // Dereference the window
    // For multiple windows store them in an array
    mainWindow = null;
}

function createMainWindow() {
    const win = new electron.BrowserWindow({
        width : 1300,
        height: 1200
    });

    win.loadURL(
        url.format({
            pathname: path.join(__dirname , '../public' , 'render.html'),
            protocol: 'file',
            slashes : true,
            frame   : false
        })
    );
    //client.create(mainWindow);
    win.webContents.openDevTools()
    win.on('closed', onClosed);
    require("./xpressRouting");// starting the express server
    return win;
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (!mainWindow) {
        mainWindow = createMainWindow();
    }
});

app.on('ready', () => {
    mainWindow = createMainWindow();
});

