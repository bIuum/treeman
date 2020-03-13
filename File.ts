import fs from 'fs';
import path from 'path';

import { splitLines, joinLines, getExtension } from './utils/utils';

class File {
    public path: string;
    public encoding: string;
    public name: string;
    public data: string;
    public ext: string;
    public line: string[];
    public lines: number;
    
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

    private update(filePath: string = this.path, encoding: string = 'utf-8') {
        const data = fs.readFileSync(filePath, encoding);

        this.path = filePath;
        this.encoding = encoding;
        this.name = path.basename(filePath);
        this.data = data;
        this.ext = getExtension(filePath);
        this.line = splitLines(data);
        this.lines = this.line.length;
    }

    includes(str: string): boolean {
        const trimData = this.data.replace(/\s/g, '');
        const trimStr = str.replace(/\s/g, '');

        return trimData.includes(trimStr);
    }

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

    delete(): void {
        try {
            fs.unlinkSync(this.path);
        } catch {
            console.error(`ERROR: Failed to delete ${this.path}.`)
            return;
        }
    }

    editLine(index: number, line: string): void {
        const editedLines = [...this.line];
        editedLines[index] = line;

        const editedData = joinLines(editedLines);
        try {
            fs.writeFileSync(this.path, editedData);
            this.update();
        } catch {
            console.error(`ERROR: Failed to write into ${this.path} white editing line #${index}`);
            return;
        }
    }
}

export default File;
