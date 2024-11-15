const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

// Set source and destination directories
const INPUT_DIR = "./svgs";
const OUTPUT_DIR = "./dist/ios";

// Function to convert a string to camelCase
function toCamelCase(str) {
  return str.replace(/-([a-z])/g, (match, p1) => p1.toUpperCase());
}

// Function to process each SVG file
function processFiles() {
  fs.readdir(INPUT_DIR, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${INPUT_DIR}:`, err);
      return;
    }

    const svgFiles = files.filter((file) => path.extname(file) === ".svg");

    if (svgFiles.length === 0) {
      console.log(`No SVG files found in ${INPUT_DIR}`);
      return;
    }

    svgFiles.forEach((file) => {
      const filenameNoExt = path.basename(file, ".svg");
      const camelCaseName = toCamelCase(filenameNoExt);
      const outputSfSymbol = path.join(OUTPUT_DIR, `${camelCaseName}.svg`);

      console.log(`Processing ${file}...`);

      exec(
        `swiftdraw "${path.join(
          INPUT_DIR,
          file
        )}" --format sfsymbol --output "${outputSfSymbol}"`,
        (err, stdout, stderr) => {
          if (err) {
            console.error(`Error processing ${file}:`, stderr);
            return;
          }
          console.log(stdout);
        }
      );
    });

    console.log("Conversion complete!");
  });
}

// Ensure the output directory exists
fs.mkdir(OUTPUT_DIR, { recursive: true }, (err) => {
  if (err) {
    console.error(`Error creating directory ${OUTPUT_DIR}:`, err);
    return;
  }

  // Start processing files
  processFiles();
});
