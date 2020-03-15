const scan = require('../dist/src/scan').default;

const FILES_IN_TESTFOL = 4;
const TEXT_FILES_IN_TESTFOL = 3;
const FILES_IN_LEVEL_ZERO = 1;

test('scan() scans all files', () => {
    let numOfFiles = 0;
    const dirPath = 'tests/testFolder';
    const cb = () => {
        numOfFiles += 1;
    }

    scan({ dirPath }, cb).then(() => {
        expect(numOfFiles).toBe(FILES_IN_TESTFOL);
    });
});

test('scan() ignores a file by extension', () => {
    let numOfFiles = 0;
    const dirPath = 'tests/testFolder';
    const ignoreList = ['.js'];

    const cb = (file) => {
        numOfFiles += 1;
    }

    scan({ dirPath, ignoreList }, cb).then(() => {
        expect(numOfFiles).toBe(TEXT_FILES_IN_TESTFOL);
    });
});

test('scan() ignores a directory', () => {
    let numOfFiles = 0;
    const dirPath = 'tests/testFolder';
    const ignoreList = ['level1deep'];

    const cb = (file) => {
        numOfFiles += 1;
    }

    scan({ dirPath, ignoreList }, cb).then(() => {
        expect(numOfFiles).toBe(FILES_IN_LEVEL_ZERO);
    });
});
