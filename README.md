# auctor

Auctor is a simple static site generator.

[Pronunciation](https://en.wikipedia.org/wiki/Wikipedia:Pronunciation_(simple_guide_to_markup,_American)): AWKtoor

## Getting started

To keep it simple, auctor expects the following structure:

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
