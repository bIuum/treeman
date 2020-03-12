// output, true if file name or path ends with ext, false otherwise
// works with extensions with 2 dots for example: '.test.js' , '.d.ts'

export function hasExt(file: string, ext: string): boolean {
    return file.endsWith(ext);
}


// output: true if two lines have the same characters in order, false otherwise
// ignores whitespaces

export function compareLines(line1: string, line2: string): boolean {
    return line1.replace(/\s/g, '') === line2.replace(/\s/g, '');
}
