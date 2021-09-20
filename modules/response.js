/*jshint esversion: 6 */
// Response module
const sendResponse = function sendResponse(request, response, data) {

    // Set response header to allow CORS
    response.header("Access-Control-Allow-Origin", "*");

    // If JSON, return json object
    if (request.params.style === 'json'){

        // Send response
        response.json(data);

    }
    // Else, return requested data obj
    else {

        // If color parameter exists
        if (request.query.fill){
            // Take data string and add fill style to all <paths>
            data = data.replace(/<path/g, '<path style="fill:#' + request.query.fill + '"');
        }

        // Set response header to img/svg
        response.header('Content-Type', 'image/svg+xml');
        // Send response
        response.send(data);

    }
};

// Custom modules
module.exports = sendResponse;
