import { BrowserWindow } from 'electron';

import { IpcMainHandler, ProcessFilesRequest } from '../interfaces';
import { processFiles } from '../utils/process-files.util';

export const processFilesHandler: IpcMainHandler = async (event, mainWindow: BrowserWindow, body: ProcessFilesRequest) =>
  processFiles(body.destinationFolder, body.fileOperations, (info) => {
    switch (info.type) {
      case 'progress': {
        mainWindow.webContents.send('process-files-progress', info);
        break;
      }
      case 'error': {
        mainWindow.webContents.send('process-files-error', info);
        break;
      }
      case 'end': {
        mainWindow.webContents.send('process-files-end', info);
        break;
      }
    }
  });

// Example usage
// const destinationFolder = './processed_files';
// const fileOperations: FileOperation[] = [
//   { operation: OperationType.COPY, sourcePath: './file1.txt' },
//   { operation: OperationType.MOVE, sourcePath: './file2.txt' },
//   { operation: OperationType.DELETE, sourcePath: './file3.txt' },
// ];
//
// processFiles(destinationFolder, fileOperations, (info) => {
//   switch (info.type) {
//     case 'progress': {
//       console.log(`Processed ${info.processedCount}/${fileOperations.length} files. ETA: ${info.eta.toFixed(2)}ms`);
//       break;
//     }
//     case 'error': {
//       console.error(`Error processing file: ${info.sourcePath}. Error: ${info.error}`);
//       break;
//     }
//     case 'end': {
//       console.log(`Processed all files in ${info.elapsedTime.toFixed(2)}ms`);
//       break;
//     }
//   }
// }).catch(console.error);
