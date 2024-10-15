import path from 'node:path';
import { Worker } from 'node:worker_threads';

import './getFolders.worker';

import { IpcMainHandler } from '../interfaces';

export const getFoldersHandler: IpcMainHandler = async (event, drive: string) => {
  const worker = new Worker(path.join(__dirname, 'getFolders.worker.js'));
  worker.postMessage(drive);

  return new Promise((resolve) => {
    worker.on('message', (result) => {
      resolve(result);
      worker.terminate();
    });
  });
};
