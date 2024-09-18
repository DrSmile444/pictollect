import * as path from 'node:path';
import { app, BrowserWindow, ipcMain, nativeImage } from 'electron';
import { osUtils } from 'move-from-sd/src/os';
import sharp from 'sharp';

// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// eslint-disable-next-line unicorn/prefer-module
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// IPC communication to fetch drives
ipcMain.handle('get-drives', async () => {
  try {
    const drives = await osUtils.getDrives();
    return drives;
  } catch (error) {
    console.error('Failed to fetch drives:', error);
    return [];
  }
});

ipcMain.handle('get-folders', async (event, drive: string) => {
  try {
    const folders = await osUtils.getFolders(drive);
    return folders;
  } catch (error) {
    console.error('Failed to fetch folders:', error);
    return [];
  }
});

ipcMain.handle('get-files', async (event, path: string) => {
  try {
    const files = await osUtils.getFiles(path);
    return files;
  } catch (error) {
    console.error('Failed to fetch files:', error);
    return [];
  }
});

ipcMain.handle(
  'get-image-path',
  // (event, filePath: string) => 'file://' + filePath,
  async (event, filePath: string): Promise<string | null> => {
    const thumbnail = await nativeImage.createThumbnailFromPath(filePath, { width: 300, height: 200 });
    return `data:image/png;base64,${thumbnail.toJPEG(90).toString('base64')}`;
  },
);

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
