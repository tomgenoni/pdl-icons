const template = (variables, { tpl }) => {
  const { componentName } = variables;
  const newName = componentName.replace("Svg", "Icon");

  return tpl`
import React from "react";

import { getInlineIconStyles, ICON_SIZE, IconTypes } from "../iconHelpers";

const ${newName}: React.FC<IconTypes> = ({ size = "lg", className }) => {
  return (
    ${variables.jsx}
  )
};

export default ${newName};
`;
};

module.exports = template;
