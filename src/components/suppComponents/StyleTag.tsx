import React from "react";
import useDynamicStyle, { DynamicStyleProps } from "../hooks/useDynamicStyle";
import { selectors } from "../stateManage/GlobalStateStor";

const StyleTag = React.memo(({ parent, fileNames }: DynamicStyleProps) => {
  useDynamicStyle({
    parent: parent,
    fileNames: fileNames,
  });
  console.log("StyleTag rendered");

  return null;
});

export default StyleTag;
