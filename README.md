# PDL Icons

This project publishes a package with PDL SVG icons for Web and Native projects.

- For Web projects, the package includes `typescript` and compiled `javascript` files.
- For Androind, the package includes `xml` files.

## Requirements

 - Node 20 or higher
 - `pnpm` package manager
 - Figma API key
 - URL of Figma icon file
 - `.env` file with Figma API key and Figma file info
 - `~/.npmrc` file with GitHub Package registry token

## Publishing the package

To release SVG changes to the package:

1. Create a new branch from `main`.
2. Run `pnpm get:svgs` to import SVG changes from Figma into `icons`.
3. Create a [changeset](https://github.com/changesets/changesets/tree/main?tab=readme-ov-file) with `npx changeset` to add the [semver](https://semver.org/) serverity and describe the change.
4. Push your branch, open a pull request, and merge it into `main`. Note: at this point the changes are in `main` but the package has not been published.
5. After your branch has merged, a "changeset" pull request will be auto-created with your changes. Multiple pull requests can be merged into `main` before publishing and the "changeset" pull request will stack changes.
6. Review and merge the "changeset" pull request into `main`. This will trigger a GitHub Action [workflow](https://github.com/tomgenoni/pdl-icons/blob/main/.github/workflows/release.yml) that publishes the [updated package](https://github.com/tomgenoni/pdl-icons/pkgs/npm/pdl-icons) to the GitHub Package npm registry.
7. On successful publish, the workflow will force merge changes to `main` with the version number bump in `package.json` and updates to the `CHANGELOG.md`.

**Note:** It is possible to publish the package manually with `pnpm publish` but it not recommended as there are multiple steps that need to be completed before publishing that are automated by the GitHub Action workflow.

## Skip publishing the package on merge

To merge commits without publishing the package, you can `[skip ci]` to the commit message. This prevents the GitHub Action workflow from running and attempting publishing the package.

**Note:** If commits merged into `main` do not have a changeset or `[skip ci]` in the commit message, the GitHub Action workflow will run but will not publish a new package.

## Technical details

### Changesets

The [changesets](https://github.com/changesets/changesets) package, and the associated GitHub Action workflow, automates a number of steps that are error-prone when attempted manually:

 - It prompts authors to add [semver](https://semver.org/) information and a description of changes.
 - It prompts authors in the pull request if this information is missing.
 - It allows multiple changes to published at once, programmitcally determining the correct semver bump to the package.
 - It auto-updates the `package.json` file with the new version number.
 - It auto-updates the `CHANGELOG.md` file with a list of changes.

### Export SVGs from Figma

[export-figma-svg](https://github.com/jacobtyq/export-figma-svg) is the basis for the Figma SVG exporting process. Because the original script is a few years old it required a number of changes to work with the current Figma API:

 - The script retrieves the "Component Set" first, to get an array of icon names, then uses the `size=x-lg` within that Component Set to get the SVG for that icon.
 - `axios` was replaced with the native Node `fetch` API.

### Publishing to GitHub Package Registry

To publish to the GitHub Package Registry, the `package.json` file must contain:

```
"publishConfig": {
  "registry": "https://npm.pkg.github.com"
},
```

### How icons are built

#### Web

 - Typescript files are generated using the [`svgr` cli](https://react-svgr.com/).
 - Compiled javascript files are generated using the `tsc` compiler the typescript files as the source.

#### Android

 - The XML files are built using [`svg2vectordrawable`]https://github.com/Ashung/svg2vectordrawable).
