import {
  ReadStream,
  writeFile
} from 'fs';
import {
  stat
} from 'fs/promises';

export const readFileContent = async (pathToFile, currentPath) => {
  if (!pathToFile || !currentPath) {
    console.error('Operation failed');
  } else {
    try {
      if (!pathToFile.split('\\')[0].includes(':')) {
        pathToFile = currentPath.split('\\')[1] ?
          `${currentPath}\\${pathToFile}` :
          `${currentPath}${pathToFile}`;
      }

      await stat(pathToFile);
      const readableStream = new ReadStream(pathToFile);
      const readPromise = new Promise((resolve, reject) => {
        readableStream.on('data', (data) => {
          resolve(`${data.toString().trim()}`);
          readableStream.destroy();
        });
        readableStream.on('error', (_) => {
          console.log('here');
          readableStream.destroy();
          reject();
        });
        readableStream.on('end', () => {
          console.log(`The file ${pathToFile.split('\\')[pathToFile.split('\\').length - 1]} is empty`);
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
      if (!pathToFile.split('\\')[0].includes(':')) {
        pathToFile = currentPath.split('\\')[1] ?
          `${currentPath}\\${pathToFile}` :
          `${currentPath}${pathToFile}`;
      }

      const createFilePromise = new Promise((resolve, reject) => {
        writeFile(pathToFile, '', (error) => {
          if (error) {
            console.error(error);
            reject();
          }
          console.log(`The file ${pathToFile.split('\\')[pathToFile.split('\\').length - 1]} was successfully created`);
          resolve();
        });
      });

      await createFilePromise;
    } catch (error) {
      console.error('Operation failed');
    }
  }
};