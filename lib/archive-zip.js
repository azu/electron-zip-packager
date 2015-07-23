// LICENSE : MIT
"use strict";
var fs = require("fs");
var archiver = require('archiver');
module.exports = function zipFolder(folderPath, outputPath) {
    return new Promise(function (resolve, reject) {
        var archive = archiver.create('zip', {});
        var output = fs.createWriteStream(outputPath);
        output.on('close', function () {
            resolve(outputPath);
        });
        archive.on('error', function (err) {
            reject(err);
        });
        archive.pipe(output);
        archive.directory(folderPath, false);
        archive.finalize();
    });
};