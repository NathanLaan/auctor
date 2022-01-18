# auctor

Auctor is a simple Node.js based static site generator that uses [Markdown](https://github.com/markedjs/marked) or [EJS JavaScript templates](https://ejs.co/) for content and [EJS JavaScript templates](https://ejs.co/) for layout

[Pronunciation](https://en.wikipedia.org/wiki/Wikipedia:Pronunciation_(simple_guide_to_markup,_American)): AWKtoor

## Dependencies

- [marked](https://www.npmjs.com/package/marked) Markdown parser.
- [ejs](https://www.npmjs.com/package/ejs) JavaScript [template engine](https://ejs.co/).
- [front-matter](https://www.npmjs.com/package/front-matter) for Jekyll-style front-matter YML parsing.
- [fs-extra](https://www.npmjs.com/package/fs-extra) for filesystem access.
- [glob](https://www.npmjs.com/package/glob) for pattern matching.

## Getting started

To keep it simple, Auctor expects the following structure:

- _includes
  - (Any EJS includes)
- _layout
  - default.ejs
  - (Any other EJS layout files)
- site
  - assets (CSS, JS, images)
  - content
    - (Any EJS, MD, or directories)

## References

This project was heavily influenced by the following:

- [Build a static site generator in 40 lines with Node.js](https://www.webdevdrops.com/en/build-static-site-generator-nodejs-8969ebe34b22/)
- [Building a simple static page generator with Node.js](https://hackernoon.com/building-a-simple-static-page-generator-with-node-js-4f58f680c47d)
- [How to make a beautiful, tiny npm package and publish it](https://www.freecodecamp.org/news/how-to-make-a-beautiful-tiny-npm-package-and-publish-it-2881d4307f78/)
