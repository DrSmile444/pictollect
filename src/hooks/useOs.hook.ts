import { FileList } from 'move-from-sd/src/interfaces';

import { ProcessCallbackInfo, ProcessFilesRequest } from '../interfaces';

export const useOs = () => {
  const fetchDrives = async () => {
    // Fetch drives using Electron IPC communication
    if (window.electron && window.electron.getDrives) {
      return await window.electron.getDrives();
    }
    return [];
  };

  const fetchFolders = async (drive: string) => {
    // Fetch files using Electron IPC communication
    if (window.electron && window.electron.getFiles) {
      return window.electron.getFolders(drive);
    }

    return [];
  };

  const getFiles = async (path: string): Promise<FileList> => {
    // Fetch files using Electron IPC communication
    if (window.electron && window.electron.getFiles) {
      return window.electron.getFiles(path);
    }

    return {
      files: [],
      dates: [],
    };
  };

  const loadImage = async (photoPath: string) => window.electron.getImageThumbnail(photoPath);

  const pickFolder = async () => {
    // Pick a folder using Electron IPC communication
    if (window.electron && window.electron.pickFolder) {
      return window.electron.pickFolder();
    }

    return null;
  };

  const processFiles = async (info: ProcessFilesRequest) => {
    // Process files using Electron IPC communication
    if (window.electron && window.electron.processFiles) {
      return window.electron.processFiles(info);
    }

    return null;
  };

  const subscribeToProcessFilesProgress = (callback: (info: ProcessCallbackInfo) => void) => {
    if (window.electron && window.electron.onProcessFilesProgress) {
      window.electron.onProcessFilesProgress(callback);
    }
  };

  return { fetchDrives, fetchFolders, getFiles, loadImage, pickFolder, processFiles, subscribeToProcessFilesProgress };
};
