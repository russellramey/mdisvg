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
            // Return font element if found
            return obj.tagName === 'font-face';
        });
        // Return
        return font;
    },

    // Get Icon
    getIcon: function findIcon(args, data) {
        // Find glyph in object
        let icon = data.children[0].children[1].children[0].children.find( obj => {
            // Remove 'mdi-' prefix, if it exists
            args.icon = args.icon.replace('mdi-', '');
            // Return icon element if found
            return obj.properties['glyph-name'] === args.icon;
        });

        // If color param does not exist, use default
        if(!args.color){
            args.color = '000000';
        }

        // If size param does not exist, use default
        if(!args.size){
            args.size = 100;
        }

        // If icon is found
        if(icon){

            // Add color to icon object
            icon.color = args.color;
            // Add size to icon object
            icon.size = args.size;

        } else {

            // Default icon object
            icon = {
                type: 'element',
                tagName: 'glyph',
                properties:{
                    'glyph-name': args.icon,
                    unicode: 404,
                    d: "M384 64h-256v256h256v-256zM384 363h-256q-18 0 -30.5 -12.5t-12.5 -30.5v-256q0 -18 12.5 -30.5t30.5 -12.5h256q18 0 30.5 12.5t12.5 30.5v256q0 18 -12.5 30.5t-30.5 12.5z"
                },
                children: [],
                color: args.color,
                size: args.size
            };

        }

        // Return
        return icon;
    }
};
