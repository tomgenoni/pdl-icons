# PDL Icons

This project publishes a package with PDL SVG icons for Web and Native projects.

- For Web projects, the package includes `typescript` and compiled `javascript` files.
- For Android, the package includes `xml` files.

## Requirements

 - Node 20 or higher
 - `npm` package manager
 - Figma API key
 - URL of Figma icon file
 - `.env` file with Figma API key and Figma file info
 - `~/.npmrc` file with GitHub tokens
 - `SwiftDraw` for Swift icon generation

## Setup

### Consuming the package

You can install the package the following to your `~/.npmrc` file:

```
@tomgenoni:registry=https://npm.pkg.github.com
```

### Developing or publishing the package

This step is only required if you are publishing from your local machine. It is not necessary if you're relying on merges to `main` to handle the publish. If so, you will need the following GitHub token to your `~/.npmrc` file:

```
//npm.pkg.github.com/:_authToken=GITHUB_TOKEN
```

[Permissions](https://docs.github.com/en/packages/learn-github-packages/about-permissions-for-github-packages#about-scopes-and-permissions-for-package-registries) for the token should include `read:packages`, `write:packages`, `delete:packages` and `repo`.

### SwiftDraw

Installing `swiftdraw` is only required if you are generating Swift icons locally. The Swift icons are generated automatically when the package is published.

```
brew install swiftdraw
```

and run with

```
npm run build:native:swift
```

## Publishing the package

To release SVG changes to the package:

1. Create a new branch from `main`.
2. Run `npm run get:svgs` to import SVG changes from Figma into `icons`.
3. Run `npx changeset` to create a [changeset](https://github.com/changesets/changesets/tree/main?tab=readme-ov-file) with the [semver](https://semver.org/) serverity and describe the change.
4. Push your branch to GitHub, open a Pull Request, and merge it into `main` when ready. Note: at this point the changes are in `main` but the package has not been published.
5. After about 1 minute or so after your branch has merged, a "changeset" Pull Request called "Version Packages" will be auto-created with all unpublished changes. Multiple pull requests can be merged into `main` before publishing and the "changeset" Pull Request will stack changes.
6. Review the "Version Packages" Pull Request and merge into `main`. This will trigger a GitHub Action [workflow](https://github.com/tomgenoni/pdl-icons/blob/main/.github/workflows/release.yml) that publishes the [updated package](https://github.com/tomgenoni/pdl-icons/pkgs/npm/pdl-icons) to the GitHub Package npm registry.
7. On successful publish, the workflow will force merge changes to `main` with the version number bump in `package.json` and updates to the `CHANGELOG.md`.

**Note:** It is possible to publish the package manually with `npm run publish` but it not recommended as there are multiple steps that need to be completed before publishing that are automated by the GitHub Action workflow.

## Committing changes without publishing the package

Add `[skip ci]` to the commit message of changes that shouldn't trigger a publish. For example, updating the README. `[skip ci]` prevents the GitHub Action workflow from running on that commit.

**Note:** If commits merged into `main` do not have a changeset or `[skip ci]` in the commit message, the GitHub Action workflow will run but will not publish a new package because it will not find any changeset data.

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

 - The script now retrieves the "Component Set" first, to get an array of icon names, then uses the `size=x-lg` within that Component Set to get the SVG code for that icon.
 - `axios` was replaced with the native Node `fetch` API.

### Publishing to GitHub Package Registry

To publish to the GitHub Package Registry, the `package.json` file contains:

```
"publishConfig": {
  "registry": "https://npm.pkg.github.com"
},
```

### How icons are built

#### Web

 - Typescript files are generated using the [`svgr` cli](https://react-svgr.com/).
 - Compiled javascript files are generated using the `tsc` compiler, using the typescript files as the source.

#### Android

 - The XML files are built using [`svg2vectordrawable`](https://github.com/Ashung/svg2vectordrawable).

#### iOS

 - `svg` and `swift` files are built using [SwiftDraw](https://github.com/swhitty/SwiftDraw).
