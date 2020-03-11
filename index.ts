const treeScanMethods = require('./treeScanMethods');

const dirName = '../desktop-proj';
const ignoreList = ['node_modules'];

const cb = (err: object, file: string) => {
    if(err) throw err;

    console.log(file);
}

treeScanMethods.folderTreeScan({ dirName, ignoreList }, cb);

module.exports = {
    ...treeScanMethods
}