import "dotenv/config";
import figmaRestApi from "./api/";
import {
  writeToFile,
  findAllByValue,
  camelCaseToDash,
  createFolder,
} from "./utils";
import {
  OUTPUT_FOLDER,
  RATE_LIMIT,
  WAIT_TIME_IN_SECONDS,
  FIGMA_SVG_NAME,
} from "./constants";

interface SVG {
  id: string;
  name: string;
}

const getProjectNode = async () => {
  return await figmaRestApi(
    "files/" +
      process.env.FIGMA_PROJECT_ID +
      "/nodes?ids=" +
      process.env.FIGMA_PROJECT_NODE_ID
  );
};

const getSVGURL = async (id: string) => {
  return await figmaRestApi(
    "images/" + process.env.FIGMA_PROJECT_ID + "/?ids=" + id + "&format=svg"
  );
};

const svgExporter = async () => {
  try {
    const response = await getProjectNode();
    const children =
      response.nodes[process.env.FIGMA_PROJECT_NODE_ID as string].document
        .children;

    // Use the SVG interface for type safety
    const sets = findAllByValue(children, "COMPONENT_SET");
    const svgs: SVG[] = findAllByValue(children, "COMPONENT");

    // When we iterate through the SVGs, we replace the name of the SVG
    // with the name of the component set, like "AllBots".
    const filteredSVGs: SVG[] = svgs
      .filter((svg) => svg.name === FIGMA_SVG_NAME)
      .map((svg, index: number) => ({
        ...svg,
        name: sets[index].name,
      }));

    const numOfSvgs = filteredSVGs.length;

    createFolder(OUTPUT_FOLDER);

    for (let i = 0; i < numOfSvgs; i += RATE_LIMIT) {
      const requests = filteredSVGs
        .slice(i, i + RATE_LIMIT)
        .map(async (svg) => {
          // Get URL of each SVG
          const svgName = svg.name;
          const svgURL = await getSVGURL(svg.id);

          // Get SVG DOM using fetch
          const response = await fetch(svgURL.images[svg.id]);
          const svgDOM = await response.text();
          writeToFile(
            OUTPUT_FOLDER + `${camelCaseToDash(svgName)}.svg`,
            svgDOM
          );
        });

      await Promise.all(requests)
        .then(() => {
          if (numOfSvgs > RATE_LIMIT) {
            // Only wait if more than one batch is needed
            console.log(`Wait for ${WAIT_TIME_IN_SECONDS} seconds`);
            return new Promise<void>((resolve) => {
              setTimeout(() => {
                console.log(`${WAIT_TIME_IN_SECONDS} seconds!`);
                resolve();
              }, WAIT_TIME_IN_SECONDS * 1000);
            });
          }
        })
        .catch((err) => console.error(`Error processing ${i} - Error ${err}`));
    }
  } catch (err) {
    console.error(err);
  }
};

svgExporter();
