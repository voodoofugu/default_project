import React from "react";
import { useNexus } from "../../../nexus-state/src/nexus";

import useDynamicStyle from "../hooks/useDynamicStyle";

const StyleTagCore: React.FC = () => {
  const styleData = useNexus("styleData");

  useDynamicStyle(styleData);

  return null;
};

export default StyleTagCore;
