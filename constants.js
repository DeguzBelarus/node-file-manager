export const EXIT_COMMAND = '.exit';
export const UP_COMMAND = 'up';
export const CD_COMMAND = 'cd';
export const LS_COMMAND = 'ls';
export const CAT_COMMAND = 'cat';
export const ADD_COMMAND = 'add';
export const RN_COMMAND = 'rn';

export const READLINE_CONFIG = {
  input: process.stdin,
  output: process.stdout,
};

export const FIRST_COMMAND_PARAM = (string) => string.split(' ')[1];
export const SECOND_COMMAND_PARAM = (string) => string.split(' ')[2];

export const IS_RELATIVE_PATH = (path) => path.split('\\')[0].includes(':') ? true : false;