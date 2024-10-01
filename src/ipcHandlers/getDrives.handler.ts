import { osUtils } from 'move-from-sd/src/os';

import { IpcMainHandler } from '../interfaces';

export const getDrivesHandler: IpcMainHandler = async () => {
  try {
    return await osUtils.getDrives();
  } catch (error) {
    console.error('Failed to fetch drives:', error);
    return [];
  }
};
