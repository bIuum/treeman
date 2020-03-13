const scan = require('./scan');
const fileUtils = require('./utils/fileUtils');
const dataUtils = require('./utils/dataUtils');

module.exports = {
    scan,
    ...dataUtils,
    ...fileUtils
}