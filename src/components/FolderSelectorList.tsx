import { FolderOffOutlined, FolderOutlined, FolderRounded, SearchRounded } from '@mui/icons-material';
import { InputAdornment, List, ListItemButton, ListItemIcon, ListItemText, Skeleton, Stack, TextField, Typography } from '@mui/material';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';

import { EmptyState } from './EmptyState';

export interface FolderSelectorListProperties {
  folders: string[];
  folder: string | null;
  onFolderSelect: (folder: string) => void;
  onFolderDoubleSelect: (folder: string) => void;
  isLoading?: boolean;
}

// we need to add filtering of folders
export const FolderSelectorList: FC<FolderSelectorListProperties> = ({
  folders,
  onFolderSelect,
  onFolderDoubleSelect,
  folder,
  isLoading,
}) => {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(folder);
  const [filteredFolders, setFilteredFolders] = useState<string[]>([]);
  const [search, setSearch] = useState<string>('');

  const handleFolderFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleFolderSelect = (folder: string) => {
    setSelectedFolder(folder);
    onFolderSelect(folder);
  };

  const handleFolderDoubleSelect = (folder: string) => {
    setSelectedFolder(folder);
    onFolderDoubleSelect(folder);
  };

  useEffect(() => {
    setFilteredFolders(folders.filter((folder) => folder.toLowerCase().includes(search.toLowerCase())));
  }, [folders, search]);

  useEffect(() => {
    if (filteredFolders.length === 1) {
      setSelectedFolder(filteredFolders[0]);
      onFolderSelect(filteredFolders[0]);
    }
  }, [filteredFolders]);

  const handleInputEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && selectedFolder) {
      onFolderDoubleSelect(selectedFolder);
    }
  };

  if (isLoading) {
    return (
      <Stack gap={1} direction="column" width="100%">
        <Skeleton variant="rounded" width="100%" height={56} />
        <Stack gap={1} direction="column" sx={{ width: '100%', maxHeight: 400, minHeight: 400, overflow: 'hidden' }}>
          <Skeleton variant="rounded" width={200} height={44} />
          <Skeleton variant="rounded" width={200} height={44} />
          <Skeleton variant="rounded" width={300} height={44} />
          <Skeleton variant="rounded" width={400} height={44} />
          <Skeleton variant="rounded" width={400} height={44} />
          <Skeleton variant="rounded" width={300} height={44} />
          <Skeleton variant="rounded" width={300} height={44} />
          <Skeleton variant="rounded" width={300} height={44} />
          <Skeleton variant="rounded" width={400} height={44} />
          <Skeleton variant="rounded" width={200} height={44} />
          <Skeleton variant="rounded" width={300} height={44} />
        </Stack>
        <Skeleton variant="rounded" width={200} height={20} />
      </Stack>
    );
  }

  return (
    <Stack gap={1}>
      <TextField
        id="filled-search"
        label="Search field"
        type="search"
        variant="outlined"
        value={search}
        onChange={handleFolderFilter}
        onKeyPress={handleInputEnter}
        autoFocus={true}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="start">
                <SearchRounded />
              </InputAdornment>
            ),
          },
        }}
      />

      {filteredFolders.length === 0 && (
        <EmptyState
          sx={{ minHeight: 400 }}
          icon={<FolderOffOutlined />}
          title="No folders"
          description={
            <>
              The list of available folders are empty.
              <br />
              Try searching for a different folder.
            </>
          }
        />
      )}

      {filteredFolders.length > 0 && (
        <List sx={{ maxHeight: 400, minHeight: 400, overflow: 'scroll' }}>
          {filteredFolders.map((folder) => {
            const isSelected = selectedFolder === folder;
            const icon = isSelected ? <FolderRounded /> : <FolderOutlined />;

            return (
              <ListItemButton
                key={folder}
                selected={isSelected}
                onClick={() => handleFolderSelect(folder)}
                onDoubleClick={() => handleFolderDoubleSelect(folder)}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={folder} />
              </ListItemButton>
            );
          })}
        </List>
      )}
      {/* add show count */}
      <Typography variant="body2" color="textSecondary">
        Show {filteredFolders.length} folders of {folders.length}
      </Typography>
    </Stack>
  );
};
