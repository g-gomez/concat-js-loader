var loaderUtils = require("loader-utils");

var rawContent = '';

module.exports = function (content) {
    if (!this.emitFile) {
        throw new Error("emitFile is required from module system");
    }

    var query = loaderUtils.parseQuery(this.query) || {};
    var name = query.name || 'bundle.raw.js';

    rawContent += content;
    this.emitFile(name, '(function () {\n' + rawContent + '\n}());');
    return rawContent;
};
