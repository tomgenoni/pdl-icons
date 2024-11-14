const template = (variables, { tpl }) => {
  return tpl`
import React from "react";

import { getInlineIconStyles, ICON_SIZE, IconTypes } from "../iconHelpers";

${variables.interfaces};

const ${variables.componentName}: React.FC<IconTypes> = ({ size = "lg", className }) => {
  return (
    ${variables.jsx}
  )
};

${variables.exports};
`;
};

module.exports = template;
