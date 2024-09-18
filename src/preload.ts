// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  getDrives: () => ipcRenderer.invoke('get-drives'),
  getFolders: (drive: string) => ipcRenderer.invoke('get-folders', drive),
  getFiles: (path: string) => ipcRenderer.invoke('get-files', path),
  getImagePath: (filePath: string) => ipcRenderer.invoke('get-image-path', filePath),
});
