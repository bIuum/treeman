import fs from 'fs';
import path from 'path';

import { splitLines, getExtension } from './utils/utils';

class File {
    public path: string;
    public name: string;
    public data: string;
    public ext: string;
    public line: string[];
    public lines: number;
    
    constructor(filePath: string, encoding: string = 'utf-8') {
        const data = fs.readFileSync(filePath, encoding);

        this.path = filePath;
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
}

export default File;
