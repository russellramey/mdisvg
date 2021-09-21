/*jshint esversion: 6 */
// Resonpse modules
// Send response with headers and data
const sendResponse = function(request, response, data) {

    // Set response header to allow CORS
    response.header("Access-Control-Allow-Origin", "*");

    // If JSON, return json object
    if (request.params.style === 'json'){

        // Send response
        response.json(data);

    }
    // Else, return requested data obj
    else {

        // Set response header to img/svg
        response.header('Content-Type', 'image/svg+xml');

        // Send response
        response.send(data);

    }
};

// Export
module.exports = sendResponse;
