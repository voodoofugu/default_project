import React from "react";
import useDynamicStyle from "../hooks/useDynamicStyle";
import { selectors } from "../stateManage/GlobalStateStor";

const StyleTag = React.memo(() => {
  const styleData = selectors.useStyleData();
  useDynamicStyle({ parent: "styleTag", fileNames: [styleData] });

  return null;
});

export default StyleTag;
