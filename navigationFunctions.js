import {
  stat,
  readdir
} from 'fs/promises';

import {
  join
} from 'path';

export const showCurrentPath = (currentPath) => {
  console.log(`You are currently in ${currentPath}`);
};

export const goToUpperDirectory = async (currentPath) => {
  if (!currentPath) {
    console.error('Operation failed');
  } else {
    let currentPathModified = currentPath.split('\\');
    if (currentPathModified.length < 3) {
      if (!currentPathModified[1]) {
        currentPathModified = currentPathModified.join('\\');
        return currentPathModified;
      } else {
        currentPathModified.length = currentPathModified.length - 1;
        currentPathModified = currentPathModified.join('\\');
        return currentPathModified + '\\';
      }
    } else {
      currentPathModified.length = currentPathModified.length - 1;
      currentPathModified = currentPathModified.join('\\');
      return currentPathModified;
    }
  }
};

export const changeDirectory = async (newPath, currentPath) => {
  if (!newPath || !currentPath) {
    console.error('Operation failed');
  } else {
    try {
      if (!newPath.split('\\')[0].includes(':')) {
        newPath = join(currentPath, newPath);
      } else {
        if (newPath.split('\\').length === 1) {
          !newPath.endsWith('\\') ? newPath += '\\' : newPath;
        }
      }
      await stat(newPath);
      return newPath.trim();
    } catch (error) {
      console.error('Operation failed');
      return currentPath;
    }
  }
};

export const getFilesList = async (currentPath) => {
  if (!currentPath) {
    console.error('Operation failed');
  } else {
    try {
      let filesData = await readdir(currentPath, {
        withFileTypes: true
      });

      const filesDataSortingMethod = (prevFileData, nextFileData) => {
        if (prevFileData.name > nextFileData.name) return 1;
        if (prevFileData.name < nextFileData.name) return -1;
      };

      filesData = filesData.map((fileData) => {
        return {
          Name: fileData.name,
          Type: fileData.isFile() ? 'file' : 'directory'
        }
      });
      filesData = [...filesData.filter((fileData) => fileData.Type === 'directory')
        .sort(filesDataSortingMethod),
        ...filesData.filter((fileData) => fileData.Type === 'file')
        .sort(filesDataSortingMethod)
      ];

      if (filesData.length) {
        console.table(filesData);
      } else {
        console.log('This folder is empty');
      }
    } catch (error) {
      console.error('Operation failed');
    }
  }
}