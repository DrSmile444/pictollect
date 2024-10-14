import { BrowserWindow } from 'electron';

import { IpcMainHandler, ProcessFilesRequest } from '../interfaces';
import { processFiles } from '../utils/process-files.util';

export const processFilesHandler: IpcMainHandler = async (event, mainWindow: BrowserWindow, body: ProcessFilesRequest) =>
  processFiles(body.destinationFolder, body.fileOperations, (info) => {
    mainWindow.webContents.send('process-files-info', info);
  });
