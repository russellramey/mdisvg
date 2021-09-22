// After window load, request all found icons
window.addEventListener('load', function(){
    // Get all elements with ICON data
    var icons = document.querySelectorAll('[data-mdisvg]');

    // If any icons are found
    if (icons) {

        // Empty array
        var json = [];

        // For each element, get icon data
        for(var i = 0; i < icons.length; i++) {
            // Build icon object
            var icon = {
                icon: icons[i].dataset.mdisvg,
                color: icons[i].dataset.mdicolor
            };
            // Add icon to json array
            json[i] = icon;
        }

        // Fetch icons via api json method
        fetch('http://localhost:3000/json?data=' + JSON.stringify(json)).then(function (response) {

        	// The API call was successful!
        	if (response.ok) {
        		return response.json();
        	}

        	// There was an error
        	return Promise.reject(response);

        }).then(function (data) {

            // For each element, get request icon name
            icons.forEach( function(icon){
                // Find glyph in object
                var svg = data.find( function(obj){
                    return obj.properties['glyph-name'] === icon.dataset.mdisvg;
                });
                // Replace element html
                icon.innerHTML = svg.svg;
            });

        }).catch(function (err) {

        	// There was an error
        	console.warn('Something went wrong.', err);

        });
    }
});
