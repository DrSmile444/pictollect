// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';

import { ProcessCallbackInfo } from './interfaces';

contextBridge.exposeInMainWorld('electron', {
  getDrives: () => ipcRenderer.invoke('get-drives'),
  getFolders: (drive: string) => ipcRenderer.invoke('get-folders', drive),
  getFiles: (path: string) => ipcRenderer.invoke('get-files', path),
  getImageThumbnail: (filePath: string) => ipcRenderer.invoke('get-image-thumbnail', filePath),
  pickFolder: () => ipcRenderer.invoke('pick-folder'),
  useStore: () => ipcRenderer.invoke('use-store'),
  processFiles: (info: ProcessCallbackInfo) => ipcRenderer.invoke('process-files', info),
  onProcessFilesInfo: (callback: (info: ProcessCallbackInfo) => void) => {
    ipcRenderer.on('process-files-info', (event, info) => {
      callback(info);
    });
  },
});

contextBridge.exposeInMainWorld('electronStore', {
  get: (key: string) => ipcRenderer.invoke('get-store', key),
  set: (key: string, value: any) => ipcRenderer.invoke('set-store', key, value),
  delete: (key: string) => ipcRenderer.invoke('delete-store', key),
  clear: () => ipcRenderer.invoke('clear-store'),
});
