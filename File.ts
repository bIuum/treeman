import fs from 'fs';
import path from 'path';

import { splitLines, getExtension } from './utils/utils';

class File {
    public path: string;
    public name: string;
    public line: string[];
    public lines: number;
    public ext: string;
    
    constructor(filePath: string, encoding: string = 'utf-8') {
        const data = fs.readFileSync(filePath, encoding);

        this.path = filePath;
        this.name = path.basename(filePath);
        this.ext = getExtension(filePath);
        this.line = splitLines(data);
        this.lines = this.line.length;
    }
}

export default File;
