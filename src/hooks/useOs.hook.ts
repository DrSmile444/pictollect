export const useOs = () => {
  const fetchDrives = async () => {
    // Fetch drives using Electron IPC communication
    if (window.electron && window.electron.getDrives) {
      const drives = await window.electron.getDrives();
      return drives;
    }
    return [];
  };

  return { fetchDrives };
};
