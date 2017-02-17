/* concat-js-loader
 *
 * Copyright (C) 2017 Guillaume Gomez
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

var loaderUtils = require("loader-utils");

var rawContent = '';

module.exports = function (content) {
    if (!this.emitFile) {
        throw new Error("emitFile is required from module system");
    }
    if (this.cacheable) {
      this.cacheable();
    }

    var query = loaderUtils.parseQuery(this.query) || {};
    var name = query.name || 'bundle.raw.js';

    rawContent += content.toString();
    this.emitFile(name, '(function () {\n' + rawContent + '\n}());');
    return content;
};

module.exports.raw = true;
