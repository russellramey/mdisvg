/*jshint esversion: 6 */
// Required dependencies
const fs = require("fs");

// Response module
const readFileData = function readFileData(file, callback) {

    // Check if file exists
    fs.exists(file.path, function(exists){

        // If it does, read it
        if (exists){
            fs.readFile(file.path, 'utf8', callback);
        } else {
            callback();
        }

    });

};

// Custom modules
module.exports = readFileData;
