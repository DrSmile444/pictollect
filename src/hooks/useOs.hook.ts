export const useOs = () => {
  const fetchDrives = async () => {
    // Fetch drives using Electron IPC communication
    if (window.electron && window.electron.getDrives) {
      return await window.electron.getDrives();
    }
    return [];
  };

  return { fetchDrives };
};
