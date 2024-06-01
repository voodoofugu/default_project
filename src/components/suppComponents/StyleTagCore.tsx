import React from "react";
import useDynamicStyle from "../hooks/useDynamicStyle";
import { selectors } from "../stateManage/GlobalStateStor";

const StyleTagCore: React.FC = () => {
  const styleData = selectors.useStyleData();
  useDynamicStyle({ styleArray: styleData });

  return null;
};

export default StyleTagCore;
