/*jshint esversion: 6 */
// App config
const config = require('./config');

// Required Modules
const express = require("express");
const cors = require('cors');
const file = require('./modules/file');
const svg = require('./modules/svg');
const sendResponse = require('./modules/response');

// Init Express, as app
var app = express();

// Icon request
// Main request of application, takes in paramters and returns Font Awesome icons
app.get("/i/:icon/", function(request, response) {

    // Process and gather request parameters
    let params = {
        // Icon Name
        icon: request.params.icon,
        // Icon Fill
        color: request.query.color
    };

    // If icon parameter exists
    if ( params.icon ) {

        // Read file data
        file.readFileData({ file: config.font }, ( data ) => {

            // Get font
            let font = file.getFont(data);
            // Get icon
            let icon = file.getIcon(params, data);

            // If font and icon exists
            if(font && icon){
                // Create svg
                let xml = svg.createSVG(font, icon);
                // Send response
                sendResponse(request, response, xml);
            } else {
                // Send response
                sendResponse(request, response, svg.notFound());
            }
        });

    }
    // Else, default response
    else {

        // Send response
        sendResponse(request, response, svg.notFound());

    }

});

// Icons as JSON
// JSON endpoint accepts json request body for multiple icons
app.get("/json", cors(), function(request, response) {

    // Json container
    let json = [];

    // If required parameter exists (data)
    if(request.query.data){
        // Try / Catch
        try{
            // Get requested icons
            let icons = JSON.parse(request.query.data);
            // Read file data
            file.readFileData({ file: config.font }, ( data ) => {

                // Get font
                let font = file.getFont(data);

                icons.forEach( icon => {
                    console.log(icon);
                    // Get icon
                    icon = file.getIcon(icon, data);

                    // If font and icon exists
                    if(font && icon){
                        // Create svg
                        icon.svg = svg.createSVG(font, icon);
                    }

                    // Send response
                    json.push(icon);

                });

                // Return response
                response.json(json);
            });

        } catch (err) {

            // Return response
            response.json(err);

        }
    } else {
        // Return error
        response.json({
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

// Start server, and listen
app.listen(3000, function() {

    // Server status
    console.log("Server running on port 3000");

});
