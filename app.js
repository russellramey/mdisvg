/*jshint esversion: 6 */
// App config
const config = require('./config');

// Required Modules
const express = require("express");
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
