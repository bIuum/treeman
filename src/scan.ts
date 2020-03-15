import { promises as fs } from 'fs';
import * as path from 'path';

import { includesSubstring } from './utils/utils';
import File from './File';

interface ScanInstructions {
  dirPath: string;
  ignoreList?: string[];
}

/**
 * This callback function applies to all files found in a tree scan.
 * 
 * @callback fileCallback
 * @param {Object} err - An object representing an error, if no error, this value is null.
 * @param {Object} file - An object representing the file. View the File class for more information.
 * 
*/
/**
 * Treeman's main function, scans through a folder down the tree.
 * Applies a callback function to all matching files inside the directory tree.
 * 
 * @param {Object} args - Arguments containing instructions for the tree scan method.
 * @param {string} args.dirPath - The path to your folder tree root.
 * @param {string[]} [args.ignoreList] - Optional list of files/folder names/extensions to ignore. example: ['node_modules','.css'] will ignore every file inside node_modules, as well as every css file in your tree.
 * @param {fileCallback} cb - A callback that will apply to every file found in the scan.
 */
export default async function scan(args: ScanInstructions, cb: Function) {
  const { dirPath, ignoreList = [] } = args;

  // read the directory for its children, which are folders and/or files
  try {
    const children = await fs.readdir(dirPath);

    if(children.length === 0) return;
  
    // iterate over the children
    for (const child of children) {
      const childPath = path.resolve(dirPath, child);
  
      // ignore if this child is in the ignore list
      if (includesSubstring(ignoreList, childPath)) return;

      // check for further information about the child
      try {
        const childStat = await fs.stat(childPath);
  
        // if it's a directory, call the function recursively with the directory
        const isDir = childStat.isDirectory();
  
        if(isDir) await scan({
          ...args,
          dirPath: childPath
        }, cb);

        // if it's a file, apply the predefined callback on it
        else{
          const file = new File(childPath);

          cb(null, file);
        }
      } catch(err) {
        cb(err);
      }
    }
  } catch(err) {
    cb(err);
  }
};
