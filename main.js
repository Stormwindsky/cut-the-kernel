/**
 * Cut the Kernel - Unofficial Cut the Rope for Linux
 * Created by Stormwindsky
 * License: MIT
 */

const { app, BrowserWindow, shell } = require('electron');
const path = require('path');

// Set the application name for the OS
app.name = "Cut the Kernel";

function createWindow() {
  // Create the browser window
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    title: "Cut the Kernel",
    // Use the local icon.png located in your project folder
    icon: path.join(__dirname, 'icon.png'),
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,    // Security: Prevents web scripts from accessing Node.js
      contextIsolation: true,   // Security: Isolates the renderer process
      sandbox: true             // Security: Enables Chromium sandbox
    }
  });

  // Load the YouTube Playable URL
  mainWindow.loadURL('https://3124257541747625710.playables.usercontent.goog/v/assets/index.html');

  // Open external links in the default system browser instead of the app
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // Optional: Set a custom User Agent if the game requires a specific one
  // mainWindow.webContents.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36");
}

// Initialization
app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window when the dock icon is clicked
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
