/*jshint esversion: 6 */
/**
 *
 * Dependencies
 *
 **/
const express = require("express");
const cors = require('cors');
const file = require('./modules/file');
const svg = require('./modules/svg');
const sendResponse = require('./modules/response');
const config = require('./config');

/**
 *
 * Config
 *
 **/
var app = express();

/**
 *
 * Routes
 *
 **/
// Main request of application, takes in paramters and returns Font Awesome icons
app.get("/:version/i/:icon/", cors(), function(request, response) {

    // Parse request parameters
    let params = {
        // Font Version
        version: request.params.version,
        // Icon Name
        icon: request.params.icon,
        // Icon Fill
        color: request.query.color,
        // Icon Size
        size: request.query.size
    };

    if (!config[params.version]) {
        // Send response
        return sendResponse(request, response, svg.notFound());
    }

    // If icon parameter exists
    if (params.icon) {

        // Read file data
        file.readFileData({
            file: config[params.version].font
        }, (data) => {

            // Get font
            let font = file.getFont(data);
            // Get icon
            let icon = file.getIcon(params, data);

            // If font and icon exists
            if (font && icon) {
                // Create svg
                let xml = svg.createSVG(font, icon);
                // Send response
                return sendResponse(request, response, xml);
            } else {
                // Send response
                return sendResponse(request, response, svg.notFound());
            }
        });

    }
    // Else, default response
    else {

        // Send response
        return sendResponse(request, response, svg.notFound());

    }

});
// JSON endpoint accepts json request body for multiple icons
app.get("/:version/json", cors(), function(request, response) {

    // Json container
    let json = [];

    // If version does not exist
    if (!config[request.params.version]) {
        // Send response
        return sendResponse(request, response, {
            error: true,
            message: 'No version found'
        });
    }

    // If required parameter exists (data)
    if (request.query.data) {
        // Try / Catch
        try {
            // Get requested icons
            let icons = JSON.parse(request.query.data);
            // Read file data
            file.readFileData({
                file: config[request.params.version].font
            }, (data) => {

                // Get font
                let font = file.getFont(data);

                // For each icon in icons array
                icons.forEach(icon => {
                    // Get icon
                    icon = file.getIcon(icon, data);

                    // If font and icon exists
                    if (font && icon) {
                        // Create svg
                        icon.rendered = svg.createSVG(font, icon);
                    }

                    // push icon object to new json array
                    json.push({
                        name: icon.properties['glyph-name'],
                        attributes: {
                            color: icon.color,
                            size: icon.size,
                            unicode: icon.properties.unicode,
                            path: icon.properties.d,
                        },
                        rendered: icon.rendered
                    });

                });

                // Send response
                return sendResponse(request, response, json);
            });

        } catch (err) {

            // Send response
            return sendResponse(request, response, err);

        }
    } else {
        // Return error
        return response.json({
            status: 'error',
            message: 'JSON ojbect string required as data parameter.'
        });
    }
});

// Icon loader
// Helper resource, returns JS function to client to load icons
app.get("/loader", function(request, response) {
    // Return static file
    response.sendFile(__dirname + '/modules/loader.js');
});

// Default
app.get("/", function(request, response) {
    response.redirect('https://google.com');
});

/**
 *
 * Server
 *
 **/
app.listen(3000, function() {
    // Server status
    console.log("Server running on port 3000");
});
