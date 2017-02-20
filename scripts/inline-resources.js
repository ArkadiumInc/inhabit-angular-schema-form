#!/usr/bin/env node
'use strict';
const through = require('through-gulp');
const gutil   = require('gulp-util');
const Buffer  = require('buffer').Buffer;
const path    = require('path');
const fs      = require('fs');

const getShortenedFile = (dirname, name) => {
    const filename = path.join(dirname, name);
    gutil.log(`Injecting ${name}...`);
    return fs.readFileSync(path.join(dirname, name), 'utf-8')
        .replace(/([\n\r]\s*)+/gm, ' ')
        .replace(/"/g, '\\"');
}

exports.templates = () => through(function (file, enc, cb) {
    const fileContents = file.contents
        .toString()
        .replace(/\s*moduleId:\s*module\.id\s*,?\s*/gm, '')
        .replace(/templateUrl:\s*'([^']+?\.html)'/g, (m, templateUrl) =>
            `template: "${getShortenedFile(path.dirname(file.path), templateUrl)}"`);
    file.contents = Buffer.from(fileContents);
    this.push(file);
    cb();
});

exports.styles = () => through(function (file, enc, cb) {
    const fileContents = file.contents.toString().replace(/styleUrls:\s*(\[[\s\S]*?\])/gm, function(m, styleUrls) {
        const urls = eval(styleUrls);
        return 'styles: ['
            + urls
                .map(styleUrl => `"${getShortenedFile(path.dirname(file.path), styleUrl)}"`)
                .join(',\n')
            + ']';
    });
    file.contents = Buffer.from(fileContents);
    this.push(file);
    cb();
});
