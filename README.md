# MDI AS SVG
Simple API that returns svg icons of the popular Material Design Icons font..

## Providers
- Material Design Icons: https://materialdesignicons.com/

## URL Structure
{domain}/version/icon
- Version: version of the API (Read Docs)
- Icon: name of icon (typically the name of the icon found in MDI documentation)

### JSON/SVG Source
{domain}/json?data=
- Data: Json body with multiple icons: `{icon: 'iconname', color: 'hexcode', size: 100}`

## URL Query Params
- color: Change size of icon artboard (svg canvas)
- size: Change fill/color of icon
