import { IpcMain } from 'electron';

export type IpcMainHandler = Parameters<IpcMain['handle']>[1];
