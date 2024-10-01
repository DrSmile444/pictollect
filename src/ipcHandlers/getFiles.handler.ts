import { FileList } from 'move-from-sd/src/interfaces';
import { osUtils } from 'move-from-sd/src/os';

import { IpcMainHandler } from '../interfaces';
import getFilesMock from '../mocks/getFiles.json';

export const getFilesHandler: IpcMainHandler = async (event, path: string): Promise<FileList> => {
  return getFilesMock;
  try {
    return await osUtils.getFiles(path);
  } catch (error) {
    console.error('Failed to fetch files:', error);
    return {
      dates: [],
      files: [],
    };
  }
};
