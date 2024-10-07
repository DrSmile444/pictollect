import Store from 'electron-store';

import { IpcMainHandler } from '../interfaces';

const store = new Store();

export const getStoreHandler: IpcMainHandler = async (event, key: string) => store.get(key);

export const setStoreHandler: IpcMainHandler = async (event, key: string, value: any) => store.set(key, value);

export const deleteStoreHandler: IpcMainHandler = async (event, key: string) => store.delete(key);

export const clearStoreHandler: IpcMainHandler = async () => store.clear();

export const storeHandlers = {
  getStore: getStoreHandler,
  setStore: setStoreHandler,
  deleteStore: deleteStoreHandler,
  clearStore: clearStoreHandler,
};
