import { BaseMethods } from 'move-from-sd/src/os/base-methods';

export type IElectronAPI = BaseMethods;

declare global {
  interface Window {
    electron: IElectronAPI;
  }
}
