/*jshint esversion: 6 */
// App config
const config = require('./config');

// Required Modules
const express = require("express");
const fs = require("fs");
const path = require("path");
const async = require("async");
const svgparse = require('svg-parser');

// Init Express, as app
var app = express();

// Icon request
// Main request of application, takes in paramters and returns Font Awesome icons
app.get("/:provider/:icon/", function(request, response) {

    // Get Provider
    let provider = request.params.provider;
    // Get Icon
    let icon = request.params.icon;

    // If provider and icon exists
    if ( config.providers.indexOf(provider) >= 0 && icon ) {
        response.send('success');
    } else {
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
