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

        // If color param does not exist, use default
        if(!args.color){
            args.color = '000000';
        }

        // If icon is found
        if(icon){

            // Add color to icon object
            icon.color = args.color;

        } else {

            // Default icon object
            icon = {
                type: 'element',
                tagName: 'glyph',
                properties:{
                    'glyph-name': args.icon,
                    unicode: null,
                    d: "M400 416c26.5 0 48 -21.5 48 -48v-352c0 -26.5 -21.5 -48 -48 -48h-352c-26.5 0 -48 21.5 -48 48v352c0 26.5 21.5 48 48 48h352zM394 16c3.2998 0 6 2.7002 6 6v340c0 3.2998 -2.7002 6 -6 6h-340c-3.2998 0 -6 -2.7002 -6 -6v-340c0 -3.2998 2.7002 -6 6 -6h340z"
                },
                children: [],
                color: args.color
            };

        }

        // Return
        return icon;
    }
};
