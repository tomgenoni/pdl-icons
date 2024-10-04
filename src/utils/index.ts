import * as fs from "fs";

export const writeToFile = async (
  filename: string,
  data: string | NodeJS.ArrayBufferView,
) => {
  return fs.writeFile(filename, data, (error) => {
    if (error) throw error;
    console.log(`The file ${filename} has been saved!`);
  });
};

export const camelCaseToDash = (string: string) => {
  return string.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
};

export const flattenArray = (arr: any[], d: number = 1) => {
  return d > 0
    ? arr.reduce(
        (acc, val) =>
          acc.concat(Array.isArray(val) ? flattenArray(val, d - 1) : val),
        [],
      )
    : arr.slice();
};

export const findAllByValue = (
  obj: { id: string; name: string },
  valueToFind: string,
) => {
  return Object.entries(obj).reduce(
    (acc, [key, value]) =>
      value === valueToFind
        ? acc.concat({
            id: Object.values(obj.id).join(""),
            name: Object.values(obj.name).join(""),
          })
        : typeof value === "object" && value !== null
          ? acc.concat(findAllByValue(value, valueToFind))
          : acc,
    [],
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
exports.camelCaseToDash = camelCaseToDash;
exports.flattenArray = flattenArray;
exports.findAllByValue = findAllByValue;
exports.createFolder = createFolder;
exports.filterPrivateComponents = filterPrivateComponents;
