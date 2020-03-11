"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var fs = require("fs");
var path = require("path");
function folderTreeScan(args, cb) {
    var dirName = args.dirName, ignoreList = args.ignoreList;
    // read the directory for its children, which are folders and/or files
    fs.readdir(dirName, function (err, children) {
        if (err)
            return cb(err);
        if (children.length === 0)
            return;
        // iterate over the children
        children.forEach(function (child) {
            var childPath = path.resolve(dirName, child);
            // ignore if this child is in the ignore list
            if (ignoreList.includes(child))
                return;
            // check for further information about the child
            // more operations could be added in a later time
            fs.stat(childPath, function (err, childStat) {
                if (err)
                    return cb(err);
                // if it's a directory, call the function recursively with the directory
                var isDir = childStat.isDirectory();
                if (isDir)
                    folderTreeScan(__assign(__assign({}, args), { dirName: childPath }), cb);
                // if it's a file, apply the predefined callback on it
                else
                    cb(null, childPath);
            });
        });
    });
}
;
module.exports = {
    folderTreeScan: folderTreeScan
};
