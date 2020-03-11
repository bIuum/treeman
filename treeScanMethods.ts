import * as fs from 'fs';
import * as path from 'path';

// input:
// first argument: args (object):
//     {
//         dirName: name of root folder to scan
//         ignoreList: name of files/folder names to ignore  
//     }
//
// second argument: cb (function)
// arguments:
//     err: object containing error, if no error - it is null
//     file: the file path, further actions can be done through it
//
// output: cb() will apply to all matching files inside the directory tree

interface ScanInstructiong {
  dirName: string;
  ignoreList?: string[];
}

function folderTreeScan(args: ScanInstructiong, cb: Function) {
  const { dirName, ignoreList } = args;

  // read the directory for its children, which are folders and/or files
  fs.readdir(dirName, (err, children) => {
    if (err) return cb(err);

    if(children.length === 0) return;
  
    // iterate over the children
    children.forEach((child) => {
      const childPath = path.resolve(dirName, child);
  
      // ignore if this child is in the ignore list
      if(ignoreList?.includes(child)) return;

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
