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

  return { fetchDrives, fetchFolders };
};
