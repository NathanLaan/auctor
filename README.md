# auctor

Auctor is a simple Node.js based static site generator that uses [Markdown](https://github.com/markedjs/marked) or [EJS JavaScript templates](https://ejs.co/) for content and [EJS JavaScript templates](https://ejs.co/) for layout templates.

[Pronunciation](https://en.wikipedia.org/wiki/Wikipedia:Pronunciation_(simple_guide_to_markup,_American)): awkTOHR

## Release Notes

- Version 1.1.1 contains an update for EJS with breaking changes to includes: `<% include file.ejs %>` changes to `<%- include('file.ejs'); %>`
- Version 1.2.0 contains critical fixes and breaking changes to the `serve` module.
- Version 1.4.0 updates all dependencies to latest versions, including a few breaking changes.
- Version 1.5.x contains cleaner console log output, and fixes to the path separator character.

## Roadmap

- [ ] Duplicate page detection (output to same file location).
- [ ] Create an index as content generated (could be used by duplicate page detection algorithm).
- [ ] Add automated sitemap generation for all generated pages.
- [ ] Add Robots.txt support, with integrated sitemap support.
- [ ] Add SASS support.
- [ ] Add minify support.
- [ ] Add [Code of Conduct](https://www.contributor-covenant.org/)

## Dependencies

- [marked](https://www.npmjs.com/package/marked) Markdown parser.
- [ejs](https://www.npmjs.com/package/ejs) JavaScript [template engine](https://ejs.co/).
- [front-matter](https://www.npmjs.com/package/front-matter) for Jekyll-style front-matter YML parsing.
- [fs-extra](https://www.npmjs.com/package/fs-extra) for filesystem access.
- [glob](https://www.npmjs.com/package/glob) for pattern matching.

## Getting started

To keep it simple, Auctor expects the following structure by convention:

- _includes
  - (Any EJS includes)
- _layout
  - default.ejs
  - (Any other EJS layout files)
- assets
  - (Any CSS, JS, image files)
- content
  - (Any EJS, MD, or directories)

## Basic NPM Commands

```bash
npm install   # install required NPM packages
npm run build # run the auctor build process
npm run serve # serve the generated HTML pages (locally)
```

## NPM Package Update Commands

```bash
npm login
npm publish
```

## References

- [Auctor Documentation](https://auctor.online)
- [Auctor Source Code](https://github.com/NathanLaan/auctor)
- [Auctor NPM Package](https://www.npmjs.com/package/auctor)
- This project loosely follows [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

This project was heavily influenced by the following:

- [Build a static site generator in 40 lines with Node.js](https://www.webdevdrops.com/en/build-static-site-generator-nodejs-8969ebe34b22/)
- [Building a simple static page generator with Node.js](https://hackernoon.com/building-a-simple-static-page-generator-with-node-js-4f58f680c47d)
- [How to make a beautiful, tiny npm package and publish it](https://www.freecodecamp.org/news/how-to-make-a-beautiful-tiny-npm-package-and-publish-it-2881d4307f78/)
