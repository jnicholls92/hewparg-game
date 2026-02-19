const { app, BrowserWindow, autoUpdater } = require('electron/main');
const path = require('path');

const server = 'https://update.electronjs.org'
const url = `${server}/updates/${process.platform}/${app.getVersion()}`
autoUpdater.setFeedURL({ url })

autoUpdater.on('checking-for-update', () => {
    console.log('Checking for update...');
});

autoUpdater.on('update-available', () => {
    console.log('Update available!');
});

autoUpdater.on('update-not-available', () => {
    console.log('Update not available!');
});

autoUpdater.on('update-downloaded', () => {
    console.log('Update downloaded!');
});

autoUpdater.on('error', (error) => {
    console.log('Update error:', error);
});

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    win.loadFile('public/index.html');
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

setInterval(() => {
    autoUpdater.checkForUpdates();
}, 10 * 60 * 1000)