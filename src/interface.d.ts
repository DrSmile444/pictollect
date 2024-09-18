import { BaseMethods } from 'move-from-sd/src/os/base-methods';

export type IElectronAPI = BaseMethods & {
  getImagePath: (path: string) => Promise<string | null>;
};

declare global {
  interface Window {
    electron: IElectronAPI;
  }
}
