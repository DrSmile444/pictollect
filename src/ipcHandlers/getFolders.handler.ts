import { osUtils } from 'move-from-sd/src/os';

import { IpcMainHandler } from '../interfaces';

export const getFoldersHandler: IpcMainHandler = async (event, drive: string) => {
  try {
    return await osUtils.getFolders(drive);
  } catch (error) {
    console.error('Failed to fetch folders:', error);
    return [];
  }
};
