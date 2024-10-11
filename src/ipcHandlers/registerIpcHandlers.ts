import { BrowserWindow, ipcMain } from 'electron';

import { getDrivesHandler } from './getDrives.handler';
import { getFilesHandler } from './getFiles.handler';
import { getFoldersHandler } from './getFolders.handler';
import { getImageThumbnailHandler } from './getImageThumbnail.handler';
import { pickFolderHandler } from './pickFolder.handler';
import { processFilesHandler } from './process-files.handler';
import { storeHandlers } from './store.handler';

export const registerIpcHandlers = (mainWindow: BrowserWindow) => {
  ipcMain.handle('get-drives', getDrivesHandler);
  ipcMain.handle('get-folders', getFoldersHandler);
  ipcMain.handle('get-files', getFilesHandler);
  ipcMain.handle('get-image-thumbnail', getImageThumbnailHandler);
  ipcMain.handle('pick-folder', pickFolderHandler);

  ipcMain.handle('get-store', storeHandlers.getStore);
  ipcMain.handle('set-store', storeHandlers.setStore);
  ipcMain.handle('delete-store', storeHandlers.deleteStore);
  ipcMain.handle('clear-store', storeHandlers.clearStore);

  ipcMain.handle('process-files', (event, info) => processFilesHandler(event, mainWindow, info));
};
