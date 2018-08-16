// Basic init
const electron = require('electron')
const { app, BrowserWindow } = electron

// Let electron reloads by itself when webpack watches changes in ./app/
if (process.env.NODE_ENV === 'development') {
    require('electron-reload')(__dirname + '/app');
}

global.scraper = require(__dirname + '/app/scraper');

// To avoid being garbage collected
let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({ width: 800, height: 600 })

    // load client
    mainWindow.loadURL(`file://${__dirname}/app/index.html`)

    mainWindow.webContents.openDevTools()
}
app.on('ready', createWindow)

app.on("window-all-closed", () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});