export const isRelativePath = (path) => path.split('\\')[0].includes(':') ? true : false;
export const relativePathNormalization = (pathToFile, currentPath) => {
  if (!isRelativePath(pathToFile)) {
    pathToFile = currentPath.split('\\')[1] ?
      `${currentPath}\\${pathToFile}` :
      `${currentPath}${pathToFile}`;
  }
  return pathToFile;
}