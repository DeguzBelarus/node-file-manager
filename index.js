import {
  createInterface
} from 'node:readline/promises';
import {
  homedir
} from 'os';

import {
  showCurrentPath,
  goToUpperDirectory,
  changeDirectory,
  getFilesList
} from './navigationFunctions.js';
import {
  readFileContent,
  createFile
} from './fileSystemFunctions.js';
import {
  CD_COMMAND,
  EXIT_COMMAND,
  READLINE_CONFIG,
  UP_COMMAND,
  LS_COMMAND,
  CAT_COMMAND,
  ADD_COMMAND
} from './constants.js';

console.log(`Welcome to the File Manager, ${process.argv.slice(2)[0].split('=')[1]}!`);
process.on("exit", () => {
  console.log(`\nThank you for using File Manager, ${process.argv.slice(2)[0].split('=')[1]}, goodbye!`);
});

let currentPath = homedir();
openReadLine();

async function openReadLine() {
  showCurrentPath(currentPath);
  const readline = createInterface(READLINE_CONFIG);

  const command = await readline.question('Enter your command (or type ".exit"): ');
  readline.close();

  switch (command) {
    case EXIT_COMMAND:
      process.exit(0);
    case UP_COMMAND:
      currentPath = await goToUpperDirectory(currentPath);
      break;
    case `${CD_COMMAND} ${command.split(' ')[1]}`:
      currentPath = await changeDirectory(command.split(' ')[1], currentPath);
      break;
    case LS_COMMAND:
      await getFilesList(currentPath);
      break;
    case `${CAT_COMMAND} ${command.split(' ')[1]}`:
      await readFileContent(command.split(' ')[1], currentPath);
      break;
    case `${ADD_COMMAND} ${command.split(' ')[1]}`:
      await createFile(command.split(' ')[1], currentPath);
      break;
    default:
      console.log('Invalid input');
  }
  openReadLine();
}