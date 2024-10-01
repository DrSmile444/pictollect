import fs from 'node:fs';
import { nativeImage } from 'electron';

import { IpcMainHandler } from '../interfaces';

export const getImageThumbnailHandler: IpcMainHandler = async (event, filePath: string): Promise<string | null> => {
  try {
    if (!filePath || !fs.existsSync(filePath)) {
      console.error(`File does not exist: ${filePath}`);
      return null;
    }

    const thumbnail = await nativeImage.createThumbnailFromPath(filePath, { width: 300, height: 200 });
    if (thumbnail) {
      return `data:image/png;base64,${thumbnail.toJPEG(90).toString('base64')}`;
    } else {
      console.error('Failed to create thumbnail');
      return null;
    }
  } catch (error) {
    console.error('Error generating thumbnail:', error);
    return null;
  }
};
