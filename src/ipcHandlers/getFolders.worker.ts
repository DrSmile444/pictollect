import { parentPort } from 'node:worker_threads';
import { osUtils } from 'move-from-sd/src/os';

parentPort?.once('message', async (drive: string) => {
  try {
    const folders = await osUtils.getFolders(drive);
    parentPort.postMessage(folders);
  } catch (error) {
    console.error('Failed to fetch files:', error);
    parentPort.postMessage([]);
  }
});
