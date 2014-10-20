var fs = require('fs');

var sqlite3 = require('sqlite3').verbose();
var gtfsDbFilename = "octranspo.db";

var db;

exports.init = function(callback) {
    if(!fs.existsSync(gtfsDbFilename)) {
        var exec = require('child_process').exec, child;
        var command = 'sqlite3 ' + gtfsDbFilename + ' <  ' + __dirname + '/' + 'sqlite3_gtfs_import';
        child = exec(command, function (error, stdout, stderr) {
            if(error) throw error;
            loadDb();
            callback();
        });
    } else {
        loadDb();
        callback();
    }
}

exports.getStops = function(stopNo, callback) {
    db.all("SELECT * FROM stops WHERE stop_code = '" + stopNo + "';", callback);
}

function loadDb() {
    db = new sqlite3.Database(gtfsDbFilename);
}

function closeDb() {
    db.close();
}