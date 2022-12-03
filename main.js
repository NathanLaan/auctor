/**
 *
 * Node.js based static site generator.
 * 
 * config {
 *  siteTitle: 'Site title used in layout templates.',
 *  siteDescription: 'Site description used in layout templates.',
 *  sitePath: 'The root path where the site can be found (./site).',
 *  rootPath: 'Root path passed to layout templates for links and assets.',
 *  outputPath: 'Output path for generated pages'
 * }
 * 
 */
module.exports = function auctor(config) {

  // imports
  const fse = require('fs-extra');
  const path = require('path');
  const frontMatter = require('front-matter');
  const ejs = require('ejs');
  const marked = require('marked');
  const glob = require('glob');

  // paths
  const sitePath = (config.sitePath !== null) ? config.sitePath : './site';
  const contentPath = sitePath + "/content";
  const outputPath = config.outputPath;

  // clear destination folder
  fse.emptyDirSync(outputPath);

  // copy assets folder
  fse.copy(`${sitePath}/assets`, `${outputPath}/assets`);

  // read pages
  const files = glob.sync('**/*.@(md|ejs|html)', { cwd: `${contentPath}` });

  files.forEach((file) => {
    // read file info, file contents, and front matter
    const fileInfo = path.parse(file);
    const fileContents = fse.readFileSync(`${contentPath}/${file}`, 'utf-8');
    const pageData = frontMatter(fileContents);

    // the file path and name
    let fileOutputPath = '';
    let fileOutputName = '';

    // permalinks are folders only.
    // if permalink defined; ignore filename and save to "permalink/index.html"
    if (pageData.attributes.permalink) {
      fileOutputPath = path.join(outputPath, pageData.attributes.permalink);
      fileOutputName = `${fileOutputPath}/index.html`;
    } else {
      fileOutputPath = path.join(outputPath, fileInfo.dir);
      fileOutputName = `${fileOutputPath}/${fileInfo.name}.html`;
    }

    if (process.env.NODE_ENV !== 'prod') {
      console.log(`SAVE PATH: ${fileOutputPath.padEnd(30)} FILE: ${fileOutputName.padEnd(30)}`);
    }

    fse.mkdirsSync(fileOutputPath);

    // copy config and front-matter to templateConfig.
    const templateConfig = Object.assign({}, config, {
      page: pageData.attributes
    });

    let pageContent;

    // generate page content based on file type
    switch (fileInfo.ext) {
      case '.md':
        pageContent = marked.parse(pageData.body);
        break;
      case '.ejs':
        pageContent = ejs.render(pageData.body, templateConfig, {
          filename: `${contentPath}/${file}`
        });
        break;
      default:
        pageContent = pageData.body;
    }

    // render page using pageContent and layout
    const layout = pageData.attributes.layout || 'default';
    const layoutFileName = `./_layout/${layout}.ejs`;
    const layoutFileContents = fse.readFileSync(layoutFileName, 'utf-8');
    const pageContentRendered = ejs.render(
      layoutFileContents,
      Object.assign({}, templateConfig, {
        body: pageContent,
        filename: layoutFileName
      })
    );

    fse.writeFileSync(fileOutputName, pageContentRendered);

  });
}