export const EXIT_COMMAND = '.exit';
export const UP_COMMAND = 'up';
export const CD_COMMAND = 'cd';
export const LS_COMMAND = 'ls';
export const CAT_COMMAND = 'cat';
export const ADD_COMMAND = 'add';
export const RN_COMMAND = 'rn';
export const CP_COMMAND = 'cp';
export const MV_COMMAND = 'mv';
export const RM_COMMAND = 'rm';
export const OS_COMMAND = 'os';
export const EOL_PARAM = 'EOL';
export const CPUS_PARAM = 'cpus';
export const HOMEDIR_PARAM = 'homedir';
export const USERNAME_PARAM = 'username';
export const ARCHITECTURE_PARAM = 'architecture';
export const HASH_COMMAND = 'hash';
export const COMPRESS_COMMAND = 'compress';
export const DECOMPRESS_COMMAND = 'decompress';

export const READLINE_CONFIG = {
  input: process.stdin,
  output: process.stdout,
};

export const FIRST_COMMAND_PARAM = (string) => string.split(' ')[1];
export const SECOND_COMMAND_PARAM = (string) => string.split(' ')[2];

export const IS_RELATIVE_PATH = (path) => path.split('\\')[0].includes(':') ? true : false;
export const RELATIVE_PATH_NORMALIZATION = (pathToFile, currentPath) => {
  if (!IS_RELATIVE_PATH(pathToFile)) {
    pathToFile = currentPath.split('\\')[1] ?
      `${currentPath}\\${pathToFile}` :
      `${currentPath}${pathToFile}`;
  }
  return pathToFile;
}