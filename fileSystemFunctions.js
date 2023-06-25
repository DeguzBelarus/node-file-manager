import {
  ReadStream,
  writeFile,
  rename,
  WriteStream,
  rm
} from 'fs';
import {
  stat
} from 'fs/promises';

import {
  relativePathNormalization
} from "./utils.js";

export const readFileContent = async (pathToFile, currentPath) => {
  if (!pathToFile || !currentPath) {
    console.error('Operation failed');
  } else {
    try {
      pathToFile = relativePathNormalization(pathToFile, currentPath);

      await stat(pathToFile);
      const readableStream = new ReadStream(pathToFile);
      const readPromise = new Promise((resolve, reject) => {
        const fileName = pathToFile.split('\\')[pathToFile.split('\\').length - 1];

        readableStream.on('data', (data) => {
          resolve(`${data.toString().trim()}`);
          readableStream.destroy();
        });
        readableStream.on('error', (_) => {
          readableStream.destroy();
          reject();
        });
        readableStream.on('end', () => {
          console.log(`The file ${fileName} is empty`);
          resolve();
        })
      });

      const data = await readPromise;
      if (data) {
        console.log('File content:');
        console.log(data);
      }
    } catch (error) {
      console.error('Operation failed');
    }
  }
}

export const createFile = async (pathToFile, currentPath) => {
  if (!pathToFile || !currentPath) {
    console.error('Operation failed');
  } else {
    try {
      pathToFile = relativePathNormalization(pathToFile, currentPath);

      const createFilePromise = new Promise((resolve, reject) => {
        const fileName = pathToFile.split('\\')[pathToFile.split('\\').length - 1];

        writeFile(pathToFile, '', (error) => {
          if (error) {
            console.error(error);
            reject();
          }
          console.log(`The file ${fileName} was successfully created`);
          resolve();
        });
      });

      await createFilePromise;
    } catch (error) {
      console.error('Operation failed');
    }
  }
};

export const renameFile = async (pathToFile, newFileName, currentPath) => {
  if (!pathToFile || !newFileName || !currentPath) {
    console.error('Operation failed');
  } else {
    try {
      pathToFile = relativePathNormalization(pathToFile, currentPath);

      await stat(pathToFile);
      const newFilePath = pathToFile
        .split('\\')
        .map((pathElement, index) =>
          index + 1 === pathToFile.split('\\').length ? newFileName : pathElement)
        .join('\\');

      const renameFilePromise = new Promise((resolve, reject) => {
        const fileName = pathToFile.split('\\')[pathToFile.split('\\').length - 1];

        rename(pathToFile, newFilePath, (error) => {
          if (error) {
            console.error(error);
            reject();
          }
          console.log(`The file ${fileName} was successfully renamed to ${newFileName}`);
          resolve();
        });
      });

      await renameFilePromise;
    } catch (error) {
      console.error('Operation failed');
    }
  }
};

export const copyFile = async (pathToFile, newPath, currentPath) => {
  if (!pathToFile || !newPath || !currentPath) {
    console.error('Operation failed');
  } else {
    try {
      pathToFile = relativePathNormalization(pathToFile, currentPath);
      newPath = relativePathNormalization(newPath, currentPath);

      await stat(pathToFile);
      await stat(newPath);
      const copyFilePromise = new Promise((resolve, reject) => {
        const fileName = pathToFile.split('\\')[pathToFile.split('\\').length - 1];

        const readableStream = new ReadStream(pathToFile);
        const writeableStream = new WriteStream(`${newPath}\\${fileName}`);
        readableStream.pipe(writeableStream);

        writeableStream.on('finish', (_) => {
          console.log(`The file ${fileName} was successfully copied to ${newPath}`);
          readableStream.destroy();
          writeableStream.destroy();
          resolve();
        })
        writeableStream.on('error', (_) => {
          readableStream.destroy();
          writeableStream.destroy();
          reject();
        })
      });

      await copyFilePromise;
    } catch (error) {
      console.error('Operation failed');
    }
  }
};

export const moveFile = async (pathToFile, newPath, currentPath) => {
  if (!pathToFile || !newPath || !currentPath) {
    console.error('Operation failed');
  } else {
    try {
      pathToFile = relativePathNormalization(pathToFile, currentPath);
      newPath = relativePathNormalization(newPath, currentPath);

      await stat(pathToFile);
      await stat(newPath);
      const moveFilePromise = new Promise((resolve, reject) => {
        const fileName = pathToFile.split('\\')[pathToFile.split('\\').length - 1];

        const readableStream = new ReadStream(pathToFile);
        const writeableStream = new WriteStream(`${newPath}\\${fileName}`);
        readableStream.pipe(writeableStream);

        writeableStream.on('finish', (_) => {
          readableStream.destroy();
          writeableStream.destroy();
          rm(pathToFile, () => {});
          console.log(`The file ${fileName} was successfully moved to ${newPath}`);
          resolve();
        })
        writeableStream.on('error', (_) => {
          readableStream.destroy();
          writeableStream.destroy();
          reject();
        })
      });

      await moveFilePromise;
    } catch (error) {
      console.error('Operation failed');
    }
  }
};

export const removeFile = async (pathToFile, currentPath) => {
  if (!pathToFile || !currentPath) {
    console.error('Operation failed');
  } else {
    try {
      pathToFile = relativePathNormalization(pathToFile, currentPath);

      await stat(pathToFile);
      const removeFilePromise = new Promise((resolve, _) => {
        const fileName = pathToFile.split('\\')[pathToFile.split('\\').length - 1];
        rm(pathToFile, () => {});
        console.log(`The file ${fileName} was successfully removed`);
        resolve();
      });

      await removeFilePromise;
    } catch (error) {
      console.error('Operation failed');
    }
  }
};