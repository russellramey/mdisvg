/*jshint esversion: 8 */
// Required dependencies
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
        let svg = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="' + icon.size + '" height="' + icon.size + '" viewBox="' + viewbox.join(' ') + '">' +
                        '<g transform="scale(1,-1) translate(' + Math.abs(font.properties.descent) +', -'+ ascent +')">' +
                            '<path data-glyph="' + icon.properties['glyph-name'] + '" fill="#' + icon.color + '" d="' + icon.properties.d + '"/>' +
                        '</g>' +
                  '</svg>';

        // Return
        return svg;
    },

    // Not found / Default icon
    notFound: function notFound(){
        return '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100" height="100" viewBox="0 64.7273 512 448.462"><g transform="scale(1,-1) translate(0, -480.36365)"><path data-glyph="404" fill="red" d="M384 64h-256v256h256v-256zM384 363h-256q-18 0 -30.5 -12.5t-12.5 -30.5v-256q0 -18 12.5 -30.5t30.5 -12.5h256q18 0 30.5 12.5t12.5 30.5v256q0 18 -12.5 30.5t-30.5 12.5z"/></g></svg>';
    }
};
