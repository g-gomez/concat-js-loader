/* concat-js-loader
 *
 * Copyright (C) 2017 Guillaume Gomez
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

var loaderUtils = require("loader-utils");

var references = {};
var rawContent = {};

module.exports = function (content) {
    if (!this.emitFile) {
        throw new Error("emitFile is required from module system");
    }

    if (this.cacheable) {
      this.cacheable();
    }

    var fileName = this.resource;
    if (!fileName.match(/(node_modules|webpack)/)) {
        var query = loaderUtils.getOptions(this) || {};
        var name = query.name || 'bundle.raw.js';

        if (!references[name]) {
            references[name] = [];
        }

        if (references[name].indexOf(fileName) < 0) {
            references[name].push(fileName);
        }

        rawContent[fileName] = content.toString();

        for (newFile = '', i = 0; i < references[name].length; i++) {
            newFile += rawContent[references[name][i]];
        }
        this.emitFile(name, '(function () {\n' + newFile + '\n}());');
    }

    return content;
};

module.exports.raw = true;
