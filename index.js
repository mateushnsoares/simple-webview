const { app, BrowserWindow, globalShortcut } = require("electron");

let win;
function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    alwaysOnTop: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true,
    },
  });
  win.setMenu(null);
  win.loadFile("index.html");
  createShortcuts();
}

function toggleDevTools() {
  win.webContents.toggleDevTools();
}

function createShortcuts() {
  globalShortcut.register("CmdOrCtrl+Shift+i", toggleDevTools);
}

app.on("ready", createWindow);
app.allowRendererProcessReuse = false;

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
