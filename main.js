const { app, BrowserWindow } = require('electron')
const url = require("url");
const path = require("path");

let mainWindow

const devMode = /electron/.test(path.basename(app.getPath('exe'), '.exe'));

if (devMode) {
  // Set appname and userData to indicate development environment
  app.setName(app.getName() + '-dev');
  app.setPath('userData', app.getPath('userData') + '-dev');
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1500, height: 800,
    webPreferences: {
      nodeIntegration: true,
      devTools: devMode
    }
  })

  if (!devMode) {
    mainWindow.setMenu(null);
  }
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `dist`, `index.html`),
      protocol: "file:",
      slashes: true
    })
  );
  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})