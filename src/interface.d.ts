import { Drive } from 'move-from-sd/src/interfaces';

export interface IElectronAPI {
  getDrives: () => Promise<Drive[]>;
}

declare global {
  interface Window {
    electron: IElectronAPI;
  }
}
