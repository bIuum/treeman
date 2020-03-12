/**
 * This function checks if a file's name ends with a certain extension.
 * Works with extensions with 2 dots, example: '.test.js', '.d.ts'.
 * 
 * @param {string} file - Your file name/absolute path, works with 'file' value from treeman's callback scan functions.
 * @param {string} ext - An extension you wish to check for.
 * @returns {boolean} True if file ends with ext, false otherwise.
 */
export function hasExt(file: string, ext: string): boolean {
    return file.endsWith(ext);
}
