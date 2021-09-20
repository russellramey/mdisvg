const fs = require('fs');
const svgparse = require('svg-parser')

var query = 'alarm-fill';

var data = fs.readFileSync('../vendor/bootstrap/bootstrap-icons.svg', 'utf8');

var svg = svgparse.parse(data)

// If svg data exists
if(svg){
	let icon = svg.children[0].children[1].children[0].children.find(obj => {
		return obj.properties['glyph-name'] === query
	})
	console.log(icon)
}


