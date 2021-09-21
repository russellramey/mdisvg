/*jshint esversion: 8 */
// Required dependencies
const fs = require("fs");
const svgparse = require('svg-parser');

// Custom modules
module.exports = {
    readFileData: function readFileData(args, callback) {

        // Check if file exists
        fs.exists(args.file, function(exists){

            // If it does, read it
            if (exists){
                fs.readFile(args.file, 'utf8', function(err, data){
                    // Init json variable
                    let json = {};
                    // If file error
                    if (err) {
                        json = err;
                    }
                    // Convert file data to json
                    json = svgparse.parse(data);
                    // Executed callback
                    callback(json);
                });
            } else {
                callback();
            }

        });
    },

    // Get Font
    getFont: function getFont(data) {
        // Find glyph in object
        let font = data.children[0].children[1].children[0].children.find( obj => {
            return obj.tagName === 'font-face';
        });
        // Return
        return font;
    },

    // Get Icon
    getIcon: function findIcon(args, data) {
        // Find glyph in object
        let icon = data.children[0].children[1].children[0].children.find( obj => {
            return obj.properties['glyph-name'] === args.icon;
        });
        // Return
        return icon;
    },
};
