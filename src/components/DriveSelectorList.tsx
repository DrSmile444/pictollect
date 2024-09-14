import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {Drive} from "move-from-sd/src/interfaces";
import {FC, useEffect, useState} from "react";
import {
    DynamicFormRounded,
    SdRounded,
    SdStorageRounded,
    SettingsSystemDaydreamRounded,
    StorageRounded
} from "@mui/icons-material";

interface DriveSelectorListProps {
    onSelect: (drive: Drive) => void;
    drives: Drive[];
}

export const DriveSelectorList: FC<DriveSelectorListProps> = ({ onSelect, drives }) => {
    const [selectedDrive, setSelectedDrive] = useState<Drive | null>(null);

    const handleListItemClick = (
        drive: Drive,
    ) => {
        setSelectedDrive(drive);
        onSelect(drive);
    };

    const icons: Record<Drive['driveType'], React.ReactElement> = {
        'local': <StorageRounded />,
        'removable': <SdStorageRounded />,
        'unknown': <DynamicFormRounded />,
    }

    // We need to create auto select of first removable drive
    useEffect(() => {
        const removableDrive = drives.find((drive) => drive.driveType === 'removable');
        if (removableDrive) {
            handleListItemClick(removableDrive);
        }
    }, [drives]);

    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <List component="nav" aria-label="main mailbox folders">
                {drives.map((drive) => (
                    <ListItemButton
                        key={drive.drive}
                        selected={selectedDrive === drive}
                        onClick={() => handleListItemClick(drive)}
                    >
                        <ListItemIcon>
                            {icons[drive.driveType]}
                        </ListItemIcon>
                        <ListItemText primary={drive.name} secondary={drive.drive} />
                    </ListItemButton>
                ))}
            </List>
        </Box>
    );
}
