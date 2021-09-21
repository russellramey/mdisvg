/*jshint esversion: 8 */
// Required dependencies
const providers = require('./providers');

// Response module
const createSVG = function createSVG(font, icon) {

    // Get viewbox
    let viewbox = font.properties.bbox.split(' ');

    // Configure viewbox
    viewbox = [
        Math.abs(viewbox[0]),
        Math.abs(viewbox[1]),
        viewbox[2],
        viewbox[3]
    ];

    // Configure viewbox ascent
    let ascent = font.properties.ascent + (viewbox[1] / 2);

    // SVG Markup
    let svg = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="300" height="300" viewBox="' + viewbox.join(' ') + '">' +
                    '<g transform="scale(1,-1) translate(' + Math.abs(font.properties.descent) +', -'+ ascent +')">' +
                        '<path fill="#' + icon.color + '" d="' + icon.properties.d + '"/>' +
                    '</g>' +
              '</svg>';

    // Return
    return svg;
};

// Custom modules
module.exports = createSVG;
