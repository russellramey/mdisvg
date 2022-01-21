/*jshint esversion: 6 */
/**
 *
 * Reponse functions
 *
 **/
// Send response with headers and data
const sendResponse = function(request, response, data) {

    // Set response header to allow CORS
    response.header("Access-Control-Allow-Origin", "*");

    // If JSON, return json object
    if (request.path.includes('/json')){

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

/**
 *
 * Export
 *
 **/
module.exports = sendResponse;
