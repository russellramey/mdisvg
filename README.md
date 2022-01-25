# MDI AS SVG
Simple API that returns svg icons of the popular Material Design Icons font..

## Official documentation
https://www.mdisvg.com

## Available Icons
This api makes available all the icons found in the latest release of the Material Design Icons font set (https://materialdesignicons.com/).

## URL Structure
See below for basic usage for more info, [Read documentation here](https://www.mdisvg.com).

**api.mdisvg.com/{version}/i/{icon}**
- Version: version of the API
- Icon: name of icon (typically the name of the icon found in MDI documentation)

Supported query parameters:
- color: Icon color in hex format (ex. 3399cc)
- size: Icon size in pixels (ex. 100)

### JSON/SVG Source
**api.mdisvg.com/{version}/json?data=**
- Data: Json body with multiple icons: `{icon: 'iconname', color: 'hexcode', size: 100}`

## URL Query Params
- color: Change size of icon artboard (svg canvas)
- size: Change fill/color of icon