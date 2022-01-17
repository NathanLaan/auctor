/**
 *
 * Node.js based static site generator.
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
  const sitePath = './site';
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

    if (pageData.attributes.permalink) {
      fileOutputPath = path.join(outputPath, pageData.attributes.permalink);
      fileOutputName = `${fileOutputPath}/index.html`;
    } else {
      fileOutputPath = path.join(outputPath, fileInfo.dir);
      fileOutputName = `${fileOutputPath}/${fileInfo.name}.html`;
    }

    if (process.env.NODE_ENV !== 'prod') {
      console.log('fileOutputPath: ' + fileOutputPath);
      console.log('fileOutputName: ' + fileOutputName);
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

    // render layout with page contents
    const layout = pageData.attributes.layout || 'default';
    const layoutFileName = `./_layout/${layout}.ejs`;
    const layoutFileContents = fse.readFileSync(layoutFileName, 'utf-8');
    const renderedPage = ejs.render(
      layoutFileContents,
      Object.assign({}, templateConfig, {
        body: pageContent,
        filename: layoutFileName
      })
    );

    fse.writeFileSync(fileOutputName, renderedPage);

  });
}