import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { FileList } from 'move-from-sd/src/interfaces';
import React, { FC, useEffect, useState } from 'react';

export interface DatePhotoGridProperties {
  fileList: FileList | null;
}

export const DatePhotoGrid: FC<DatePhotoGridProperties> = ({ fileList }) => {
  const loadImage = async (photoPath: string) => window.electron.getImagePath(photoPath);

  return (
    <Grid container spacing={4}>
      {fileList?.dates.map((dateInfo, index) => {
        const files = fileList.files.filter((file) => file.fullDate === dateInfo.value);

        return (
          <Grid item xs={12} md={6} key={index}>
            <Card>
              <CardContent>
                {/* Date Title */}
                <Typography variant="h6">{dateInfo.name}</Typography>
                {/* Total Size of Files */}
                <Typography variant="subtitle1" color="textSecondary">
                  Total Size: {dateInfo.value}
                </Typography>
              </CardContent>

              {/* Display Photos (max 4) */}
              <Grid container spacing={2}>
                {files.slice(0, 4).map((photo, photoIndex) => {
                  const [path, setPath] = useState<Electron.NativeImage | null>(null);

                  useEffect(() => {
                    loadImage(photo.file).then((imagePath) => setPath(imagePath));
                  }, []);

                  return (
                    <Grid item xs={6} key={photoIndex}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={path} // Replace with the correct path or URL for photos
                        alt={`Photo from ${dateInfo.name}`}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};
