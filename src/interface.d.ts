import { BaseMethods } from 'move-from-sd/src/os/base-methods';

export type ElectronAPI = BaseMethods & {
  getImageThumbnail: (path: string) => Promise<string | null>;
  pickFolder: () => Promise<Electron.OpenDialogReturnValue>;
};

export interface ElectronStore {
  get: (key: string) => Promise<any>;
  set: (key: string, value: any) => Promise<void>;
  delete: (key: string) => Promise<void>;
  clear: () => Promise<void>;
}

declare global {
  interface Window {
    electron: ElectronAPI;
    electronStore: ElectronStore;
  }
}
