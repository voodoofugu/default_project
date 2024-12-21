import React from "react";

import useDynamicStyle from "../hooks/useDynamicStyle";

const StyleTagCore: React.FC = () => {
  useDynamicStyle((name: string) => import(`../../style/css/${name}.css`));

  return null;
};

export default StyleTagCore;
