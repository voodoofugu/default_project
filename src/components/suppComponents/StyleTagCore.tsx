import React from "react";
import useDynamicStyle from "../hooks/useDynamicStyle";
import { selectors } from "../stateManage/GlobalStateStor";

const StyleTagCore = (): React.ReactElement => {
  const styleData = selectors.useStyleData();

  const styleArray = styleData
    .map((style: object) =>
      Object.entries(style).map(([parent, fileNames]) => ({
        parent: parent,
        fileNames: Array.isArray(fileNames) ? fileNames : [fileNames],
      }))
    )
    .flat();

  useDynamicStyle({ styleArray });

  return null;
};

export default StyleTagCore;
