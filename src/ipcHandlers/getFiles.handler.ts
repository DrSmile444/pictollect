import path from 'node:path';
import { Worker } from 'node:worker_threads';

import './getFiles.worker';

import { IpcMainHandler } from '../interfaces';
import getFilesMock from '../mocks/getFiles.json';

export const getFilesHandler: IpcMainHandler = async (event, folderPath: string): Promise<FileList> => {
  return getFilesMock as any;

  const worker = new Worker(path.join(__dirname, 'getFiles.worker.js'));
  worker.postMessage(folderPath);

  return new Promise((resolve) => {
    worker.on('message', (result) => {
      resolve(result);
      worker.terminate();
    });
  });
};
