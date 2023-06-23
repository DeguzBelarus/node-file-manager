import {
  stat,
  readdir
} from 'fs/promises';
import {
  join
} from 'path';

import {
  IS_RELATIVE_PATH
} from "./constants.js";

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
        console.log('You are currently at the root of the disk');
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
      if (!IS_RELATIVE_PATH(newPath)) {
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

      const filesDataSortingMethod = (prevFileData, nextFileData) =>
        prevFileData.name > nextFileData.name ? -1 : 1;
      const directoriesFiltrationMethod = (fileData) => fileData.Type === 'directory';
      const filesFiltrationMethod = (fileData) => fileData.Type === 'file';


      filesData = filesData.map((fileData) => {
        return {
          Name: fileData.name,
          Type: fileData.isFile() ? 'file' : 'directory'
        }
      });
      filesData = [...filesData.filter(directoriesFiltrationMethod)
        .sort(filesDataSortingMethod),
        ...filesData.filter(filesFiltrationMethod)
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