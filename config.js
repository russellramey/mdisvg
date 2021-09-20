/*jshint esversion: 6 */
// App config
const config = {
    // Available providers
    providers: [
        {
            name: 'bootstrap',
            styles: {
                default: './vendor/bootstrap/bootstrap-icons.svg'
            }
        },
        {
            name: 'fontawesome',
            styles: {
                default: './vendor/bootstrap/bootstrap-icons.svg',
                solid: './vendor/bootstrap/bootstrap-icons.svg',
                brand: './vendor/bootstrap/bootstrap-icons.svg'
            }
        },
        {
            name: 'foundation',
            styles: {
                default: './vendor/bootstrap/bootstrap-icons.svg'
            }
        },
        {
            name: 'materialdesignicons',
            styles: {
                default: './vendor/materialdesignicons/materialdesignicons-webfont.svg'
            }
        },
        {
            name: 'ionicons',
            styles: {
                default: './vendor/ionicons/materialdesignicons-webfont.svg'
            }
        }
    ]
};

// Export
module.exports = config;
