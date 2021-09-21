/*jshint esversion: 8 */
// Required dependencies
const providers = require('./providers');

// SVG module
module.exports = {

    // Make svg markup
    createSVG: function createSVG(font, icon) {

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
    },

    // Not found / Default icon
    notFound: function notFound(){
        return '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="300" height="300" viewBox="0.0663408 64.0662 640.004 448.1"><g transform="scale(1,-1) translate(84, -480.0331)"><path fill="red" d="M400 416c26.5 0 48 -21.5 48 -48v-352c0 -26.5 -21.5 -48 -48 -48h-352c-26.5 0 -48 21.5 -48 48v352c0 26.5 21.5 48 48 48h352zM394 16c3.2998 0 6 2.7002 6 6v340c0 3.2998 -2.7002 6 -6 6h-340c-3.2998 0 -6 -2.7002 -6 -6v-340c0 -3.2998 2.7002 -6 6 -6h340z"/></g></svg>';
    }
};
