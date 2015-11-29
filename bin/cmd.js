#!/usr/bin/env node
var fs = require('fs');
var args = require('minimist')(process.argv.slice(2), {boolean: ['prune', 'asar', 'all', 'overwrite']});
var archive = require("../lib/archive-zip");
var packager = require('electron-packager');
var path = require("path");
args.dir = args._[0];
args.name = args._[1];

var protocolSchemes = [].concat(args.protocol || []);
var protocolNames = [].concat(args['protocol-name'] || []);

if (protocolSchemes && protocolNames && protocolNames.length === protocolSchemes.length) {
    args.protocols = protocolSchemes.map(function (scheme, i) {
        return {schemes: [scheme], name: protocolNames[i]}
    })
}

packager(args, function done(err, appPaths) {
    if (err) {
        if (err.message) {
            console.error(err.message);
        } else {
            console.error(err, err.stack);
        }
        process.exit(1);
    }

    var zippedPromises = appPaths.map(function (appPath) {
        console.log(appPath + ".zip");
        return archive(appPath, appPath + ".zip");
    });
    Promise.all(zippedPromises).then(function () {
        console.log('Wrote new apps');
    }).catch(function (error) {
        console.error(error, error.stack);
    });
});
