import React from "react";
import useDynamicStyle, { DynamicStyleProps } from "../hooks/useDynamicStyle";

const StyleTag: React.FC<DynamicStyleProps> = React.memo(
  ({ parent, fileNames }) => {
    useDynamicStyle({ parent, fileNames });
    return null;
  }
);

export default StyleTag;
