const template = (variables, { tpl }) => {
  const { componentName } = variables;
  const convertedComponentName = componentName.replace("Svg", "");

  return tpl`
import React from "react";

import { getInlineIconStyles, ICON_SIZE, IconTypes } from "../lib/iconHelpers";

const ${convertedComponentName}: React.FC<IconTypes> = ({ size = "lg", className }) => {
  return (
    ${variables.jsx}
  )
};

export default ${convertedComponentName};
`;
};

module.exports = template;
