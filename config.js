/*jshint esversion: 6 */
// App config
const config = {
    // Available providers
    providers: [
        {
            name: 'bootstrap',
            slug: 'bs',
            styles: {
                default: './vendor/bootstrap/bootstrap-icons.svg'
            }
        },
        {
            name: 'fontawesome',
            slug: 'fa',
            styles: {
                default: './vendor/fontawesome/regular.svg',
                solid: './vendor/fontawesome/solid.svg',
                brand: './vendor/fontawesome/brands.svg',
                regular: './vendor/fontawesome/regular.svg'
            }
        },
        {
            name: 'materialdesignicons',
            slug: 'mdi',
            styles: {
                default: './vendor/materialdesignicons/materialdesignicons-webfont.svg'
            }
        }
    ]
};

// Export
module.exports = config;
