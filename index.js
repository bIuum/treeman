const treeScanMethods = require('./treeScanMethods');
const path = require('path');

const args = {
  dirName: '../desktop-proj',
  ignoreList: ['node_modules']
}

treeScanMethods.folderTreeScan(args, (err, file) => {
  if(err) console.log('Error!');

  else {
    if(path.extname(file) === '.txt') console.log(file);
  }
});

module.exports = {
    ...treeScanMethods
}