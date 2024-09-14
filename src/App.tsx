// App.tsx or any parent component
import React from 'react';
import {DriveSelector} from "./components/DriveSelector";
import {Drive} from "../../move-from-sd/src/interfaces";
import {DriveSelectorList} from "./components/DriveSelectorList";
import Box from "@mui/material/Box";

const App: React.FC = () => {
    const handleDriveSelect = (drive: Drive) => {
        console.log('Selected Drive:', drive);
        // You can add logic to handle the selected drive
    };

    const fetchDrives = async () => {
        // Fetch drives using Electron IPC communication
        if (window.electron && window.electron.getDrives) {
            const drives = await window.electron.getDrives();
            return drives;
        }
        return [];
    };

    return (
        <Box sx={{ padding: '20px' }}>
            <h1>Select a Drive</h1>
            <DriveSelector onSelect={handleDriveSelect} fetchDrives={fetchDrives} />
        </Box>
    );
};

export default App;
