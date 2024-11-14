const path = require("path");

function customIndexTemplate(filePaths) {
  const exportEntries = filePaths.map(({ path: filePath }) => {
    const basename = path.basename(filePath, path.extname(filePath));
    const filename = `Icon${basename}`;
    return `export { default as ${filename} } from './${basename}'`;
  });
  return exportEntries.join("\n");
}

module.exports = customIndexTemplate;
