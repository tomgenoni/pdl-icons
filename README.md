# Export Figma SVGs to build platform icons

This project is a series of scripts that:

1. Exports SVGs from Figma into a branch
2. After merging new icons to the `main` branch, publishes new version to GitHub Packages
3. On package install into a project, converts the SVGs to platform-specific icons

## Requirements

 - Node 18 or higher
 - Figma API key
 - URL of Figma icon file
 - `.env` file

## Setup


## Export SVGs from Figma

[export-figma-svg](https://github.com/jacobtyq/export-figma-svg) is the basis for the Figma SVG exporting process. Because the original script is a few years old it required a number of changes to work with the current Figma API.

 - The script retrieves the "Component Set" first, to get an array of icon names, then uses the `size=x-lg` within that Component Set to get the SVG for that icon.
  - `axios` was replaced with the native Node `fetch` API.
