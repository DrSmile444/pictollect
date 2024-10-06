import { parentPort } from 'node:worker_threads';
import { osUtils } from 'move-from-sd/src/os';

parentPort?.once('message', async (path: string) => {
  try {
    const files = await osUtils.getFiles(path);
    parentPort.postMessage(files);
  } catch (error) {
    console.error('Failed to fetch files:', error);
    parentPort.postMessage({
      dates: [],
      files: [],
    });
  }
});
