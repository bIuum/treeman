import path from 'path';

/**
 * Gets the extension of a file, unlike path.extname(), it will get the full extension name.
 * For example:
 * path.extname('mytest.test.js') -> '.js'
 * getExtension('mytest.test.js) -> '.test.js
 * 
 * @param {string} file - File's base name or path.
 * @returns {string} File's extension.  
 */
export function getExtension(file: string): string {
    const name = path.basename(file);
    const split = name.split('.');

    split[0] = '';

    return split.join('.');
}

/**
 * Checks if a string includes at least one of the strings in an array.
 * 
 * @param {string[]} arr - Array of potential substrings of the second argument.
 * @param {string} str  - The string which the check will apply on.
 * @returns {boolean} True if str includes at least one of the strings in arr, false otherwise.
 */

export function includesSubstring(arr: string[], str: string): boolean {
    if (!arr.length) return false;
    
    let match = false;

    arr.forEach(function (element) {
        if (str.includes(element))
            match = true;
    });
    
    return match;
}

/**
 * Splits a file's data into a list of lines, for individual editing of each line.
 * 
 * @param {string} data - A file's content as a string.
 * @returns {string[]} An array of the file's content, split by newline character
 */

export function splitLines(data: string): Array<string> {
    return data.split('\n');
}

/**
 * Joins a list of lines into a single joined string, this function can be considered the "closing" function for the splitLines() function.
 * 
 * @param {string[]} split - An array of strings (lines)
 * @returns {string} A string containing all the lines in order, each in a new line.
 */
export function joinLines(split: Array<string>): string {
    return split.join('\n');
}

/**
 * Compares two strings (lines), checks if they have the same characters, in the same order. Ignores whitespaces
 * 
 * @param {string} line1 
 * @param {string} line2 
 */

export function compareLines(line1: string, line2: string): boolean {
    return line1.replace(/\s/g, '') === line2.replace(/\s/g, '');
}
