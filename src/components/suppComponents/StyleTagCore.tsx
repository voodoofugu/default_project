import React from "react";

import useDynamicStyle from "../hooks/useDynamicStyle";

const StyleTagCore: React.FC = () => {
  const importStyle = async ({ fileName }: { fileName: string }) => {
    const { default: data } = await import(`../../style/css/${fileName}.css`);
    return data;
  };

  useDynamicStyle(importStyle);

  return null;
};

export default StyleTagCore;
