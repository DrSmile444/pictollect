import { BaseMethods } from 'move-from-sd/src/os/base-methods';

export type IElectronAPI = BaseMethods & {
  getImageThumbnail: (path: string) => Promise<string | null>;
  pickFolder: () => Promise<Electron.OpenDialogReturnValue>;
};

declare global {
  interface Window {
    electron: IElectronAPI;
  }
}
