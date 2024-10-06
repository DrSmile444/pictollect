import { dialog } from 'electron';

import { IpcMainHandler } from '../interfaces';

export const pickFolderHandler: IpcMainHandler = async () => dialog.showOpenDialog({ properties: ['openDirectory'] });
