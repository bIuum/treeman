import fs from 'fs';
import path from 'path';

import { splitLines, joinLines, getExtension } from './utils';

/** Class representing a file, used to create a File object during a scan */
class File {
    public path: string;
    public encoding: string;
    public name: string;
    public data: string;
    public ext: string;
    public line: string[];
    public lines: number;
    
    /**
     * Create an instance of a file.
     * 
     * @param {string} filePath - An absolute or relative path to the file.
     * @param {string} encoding - File's character encoding, defaults to utf-8.
     */
    constructor(filePath: string, encoding: string = 'utf-8') {
        const data = fs.readFileSync(filePath, encoding);

        this.path = filePath;
        this.encoding = encoding;
        this.name = path.basename(filePath);
        this.data = data;
        this.ext = getExtension(filePath);
        this.line = splitLines(data);
        this.lines = this.line.length;
    }

    /**
     * This is a private methods, used within its instance, by other methods.
     * This method reconstructs the object, "refreshing" all of its properties.
     * Used after an update to one of the file's properties that might affect other properties indirectly.
     * 
     * @param {string} filePath - File's relative or absolute path. Defaults to current path. 
     * @param {string} encoding - File's character encoding. Defaults to current encoding.
     */
    private update(filePath: string = this.path, encoding: string = this.encoding): void {
        const data = fs.readFileSync(filePath, encoding);

        this.path = filePath;
        this.encoding = encoding;
        this.name = path.basename(filePath);
        this.data = data;
        this.ext = getExtension(filePath);
        this.line = splitLines(data);
        this.lines = this.line.length;
    }

    /**
     * Check if a string is included in the file. Whitespaces are ignored.
     * 
     * @param {string} str - The string that is being searched for in the file's content.
     * @returns {booleam} True if the string appears at least once inside the file, false if not. 
     */
    includes(str: string): boolean {
        const trimData = this.data.replace(/\s/g, '');
        const trimStr = str.replace(/\s/g, '');

        return trimData.includes(trimStr);
    }

    /**
     * Replaces the first instance of a string with another string inside the file's content.
     * NOTE: Just like string.prototype.replace(), it replaces only the first instance. To replace ALL instances, use regex.
     * Example: Replace all instances of 'Hello' with 'World': File.replace(/Hello/g, 'World');
     * 
     * @param {string} strFrom - The string you wish to replace. 
     * @param {string} strTo - The string that will replace the previous one.
     */
    replace(strFrom: string, strTo: string): void {
        const replaced = this.data.replace(strFrom, strTo);

        try {
            fs.writeFileSync(this.path, replaced);
            this.update();
        } catch(err) {
            console.error(`ERROR: Failed to write into ${this.path} while replacing data.`);
            return;
        }
    }

    /**
     * Deletes the file from memory. 
     * NOTE: After deletion, the file will not be sent to trash, it will be permanently deleted from memory.
     */
    delete(): void {
        try {
            fs.unlinkSync(this.path);
        } catch {
            console.error(`ERROR: Failed to delete ${this.path}.`)
            return;
        }
    }

    /**
     * Replace a specific line inside the file.
     * 
     * @param {number} index - Index of the line you wish to edit.
     * @param {string} line - The new contents of the line you wish to edit.
     */
    editLine(index: number, line: string): void {
        const editedLines = [...this.line];
        editedLines.splice(index, 1, line);

        try {
            const editedData = joinLines(editedLines);
            fs.writeFileSync(this.path, editedData);
            this.update();
        } catch {
            console.error(`ERROR: Failed to write into ${this.path} while editing line #${index}`);
            return;
        }
    }

    /**
     * Adds a line into the file in a given index.
     * If the index is in the beginning or middle of a file, all following lines will be pushed one index up.
     * 
     * @param {number} index - Index of the line you wish to add. 
     * @param {string} line - The contents of the line you wish to add.
     */
    addLine(index: number, line: string): void {
        const editedLines = [...this.line];
        editedLines.splice(index, 0, line);

        try {
            const editedData = joinLines(editedLines);
            fs.writeFileSync(this.path, editedData);
            this.update();
        } catch {
            console.error(`ERROR: Failed to write into ${this.path} while adding line #${index}`);
            return;
        }
    }
}

export default File;
