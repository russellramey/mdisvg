# ICON FONTS AS SVG
Simple API that returns various Icon Font librarires (like FontAwesome) icons as svgs.

## Providers 
- Bootstrap: https://github.com/twbs/icons/tree/main/font/fonts
- FontAwesome: https://github.com/FortAwesome/Font-Awesome/tree/master/webfonts
- Material Design Icons: https://github.com/material-icons/material-icons-font/tree/master/font
- Google Material Icons: https://github.com/google/material-design-icons/tree/master/font
- Foundation: https://raw.githubusercontent.com/zurb/foundation-icon-fonts/master/foundation-icons.svg
- Ion: https://raw.githubusercontent.com/ionic-team/ionicons/master/docs/fonts/ionicons.svg

## URL Structure
### Image/Object/Embed
{domain}/provider/icon
- Provider: icons set name/vendor
- Icon: name of icon (typiclly classed used to render font icon)

### JSON/SVG Source
{domain}/json
- Data: Json body with multiple icons

## URL Params
- Style: Change style of icon if provider supports it
- Fill: Change fill/color of icon
- Format: Change format of icon (json, svg, source)
