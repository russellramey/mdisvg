/*jshint esversion: 6 */
// App config
const config = require('./config');

// Required Modules
const express = require("express");
const fs = require("fs");
const path = require("path");
// const async = require("async");
// const svgparse = require('svg-parser');
const file = require('./modules/file');
const testsvg = require('./modules/svg');

// Init Express, as app
var app = express();

// Icon request
// Main request of application, takes in paramters and returns Font Awesome icons
app.get("/:provider/:icon/", function(request, response) {

    // Process and gather request parameters
    let params = {
        // Provider Name
        provider: request.params.provider,
        // Icon Name
        icon: request.params.icon,
        // Icon Fill
        color: request.query.color,
        // Icon Style
        style: request.query.style
    };

    // Validate provider request
    let valid_provider = config.providers.find(obj => {
        return obj.slug === params.provider;
    });

    // If provider and icon params exists
    if ( valid_provider && params.icon ) {

        // If style param exists
        if(params.style && valid_provider.styles[params.style]){
            valid_provider = valid_provider.styles[params.style];
        } else {
            valid_provider = valid_provider.styles.default;
        }

        // If color param
        if(!params.color){
            params.color = '000000';
        }

        // Read file data
        file.readFileData({ file: valid_provider }, ( data ) => {

            // Get font
            let font = file.getFont(data);
            // Get icon
            let icon = file.getIcon(params, data);
            // Send response
            if(font && icon){
                icon.color = params.color;
                let result = testsvg(font, icon);
                // Set headers
                response.setHeader('Content-Type', 'image/svg+xml');
                // Send response
                response.send(result);

                console.log(icon);
            } else {
                // Send response
                response.send('not found');
            }
        });



    }
    // Else, default response
    else {

        response.send('not found');

    }

});

// Icon JSON
// JSON endpoint accepts json request body for multiple icons
app.get("/json", function(request, response) {
    response.send('json endpoint');
});

// Icon loader
// Helper resource, returns JS function to client to load icons
app.get("/loader", function(request, response) {
    response.send('loader endpoint');
});

// Default
app.get("/", function(request, response) {
	response.send('not found');
});

// Start server, and listen
app.listen(3000, function() {

    // Server status
    console.log("Server running on port 3000");

});
