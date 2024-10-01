import { ipcMain } from 'electron';

import { getDrivesHandler } from './getDrives.handler';
import { getFilesHandler } from './getFiles.handler';
import { getFoldersHandler } from './getFolders.handler';
import { getImageThumbnailHandler } from './getImageThumbnail.handler';

export const registerIpcHandlers = () => {
  ipcMain.handle('get-drives', getDrivesHandler);
  ipcMain.handle('get-folders', getFoldersHandler);
  ipcMain.handle('get-files', getFilesHandler);
  ipcMain.handle('get-image-thumbnail', getImageThumbnailHandler);
};
