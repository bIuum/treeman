import * as fs from 'fs';
import * as path from 'path';

import { includesSubstring } from './utils/dataUtils';

/**
 * This callback function applies to all files found in a tree scan.
 * 
 * @callback fileCallback
 * @param {Object} err - An object representing an error, if no error, this value is null.
 * @param {string} file - The file's absolute path, use it to edit the file with one of treeman's functions, or your own.
 */

/**
 * Applies a callback function to all matching files inside the directory tree.
 * 
 * @param {Object} args - Arguments containing instructions for the tree scan method.
 * @param {string} args.dirName - The path to your folder tree root.
 * @param {string[]} [args.ignoreList] - Optional list of files/folder names/extensions to ignore. example: ['node_modules','.css'] will ignore every file inside node_modules, as well as every css file in your tree.
 * @param {fileCallback} cb - A callback that will apply to every file found in the scan.
 */

interface ScanInstructions {
  dirName: string;
  ignoreList?: string[];
}

function folderTreeScan(args: ScanInstructions, cb: Function) {
  const { dirName, ignoreList = [] } = args;

  // read the directory for its children, which are folders and/or files
  fs.readdir(dirName, (err, children) => {
    if (err) return cb(err);

    if(children.length === 0) return;
  
    // iterate over the children
    children.forEach((child) => {
      const childPath = path.resolve(dirName, child);
  
      // ignore if this child is in the ignore list
      if (includesSubstring(ignoreList, childPath)) return;

      // check for further information about the child
      // more operations could be added in a later time
      fs.stat(childPath, (err, childStat) => {
        if (err) return cb(err);
  
        // if it's a directory, call the function recursively with the directory
        const isDir = childStat.isDirectory();
  
        if(isDir) folderTreeScan({
          ...args,
          dirName: childPath
        }, cb);

        // if it's a file, apply the predefined callback on it
        else cb(null, childPath);
      });
    });
  });
};

module.exports = {
  folderTreeScan
}
