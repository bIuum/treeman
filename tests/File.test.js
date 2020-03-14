const File = require('../dist/src/File').default;

const filePathForTest = 'tests/testFolder/testfile.txt';

const expectedTestFileObject = {
    encoding: 'utf-8',
    path: filePathForTest,
    lines: 3,
    ext: '.txt',
    name: 'testfile.txt',
    data: 'this is a test file\r\nnumber 1\r\n',
    line: [ 'this is a test file\r', 'number 1\r', '' ]
}

test('File class constructor reads a text file properly', () => {
    const file = new File(filePathForTest);

    expect(file).toEqual(expectedTestFileObject);
});
