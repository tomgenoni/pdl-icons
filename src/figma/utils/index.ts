import * as fs from "fs";

export const writeToFile = async (
  filename: string,
  data: string | NodeJS.ArrayBufferView
) => {
  return fs.writeFile(filename, data, (error) => {
    if (error) throw error;
    console.log(`The file ${filename} has been saved!`);
  });
};

export const kebabCase = (input: string): string => {
  return input
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2") // Insert hyphen between lowercase/number and uppercase
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2") // Insert hyphen between consecutive uppercase letters followed by lowercase
    .replace(/([a-zA-Z])([0-9])/g, "$1-$2") // Insert hyphen between letters and numbers
    .toLowerCase(); // Convert the entire string to lowercase
};

export const flattenArray = (arr: any[], d: number = 1) => {
  return d > 0
    ? arr.reduce(
        (acc, val) =>
          acc.concat(Array.isArray(val) ? flattenArray(val, d - 1) : val),
        []
      )
    : arr.slice();
};

export const findAllByValue = (
  obj: { [key: string]: any },
  valueToFind: string
) => {
  return Object.entries(obj).reduce(
    (acc, [_, value]) =>
      value === valueToFind
        ? acc.concat({
            id: obj.id,
            name: obj.name,
          })
        : typeof value === "object" && value !== null
        ? acc.concat(findAllByValue(value, valueToFind))
        : acc,
    [] as { id: string; name: string }[]
  );
};

// Remove if it exists, then create the directory
export const createFolder = async (dirPath: string) => {
  try {
    await fs.promises.access(dirPath, fs.constants.F_OK);
    await fs.promises.rm(dirPath, { recursive: true, force: true });
  } catch (err) {
    if (err.code !== "ENOENT") {
      throw err;
    }
  }

  // Create the directory
  await fs.promises.mkdir(dirPath, { recursive: true });
};

export const filterPrivateComponents = (svgs: any[]) =>
  svgs.filter(({ name }) => !name.startsWith(".") && !name.startsWith("_"));

exports.writeToFile = writeToFile;
exports.kebabCase = kebabCase;
exports.flattenArray = flattenArray;
exports.findAllByValue = findAllByValue;
exports.createFolder = createFolder;
exports.filterPrivateComponents = filterPrivateComponents;
