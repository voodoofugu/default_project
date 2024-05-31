import React from "react";
import useDynamicStyle from "../hooks/useDynamicStyle";
import { selectors } from "../stateManage/GlobalStateStor";

const StyleTagCore: React.FC<{ onStylesLoaded: () => void }> = ({
  onStylesLoaded,
}) => {
  const styleData = selectors.useStyleData();
  const allStylesLoaded = useDynamicStyle({ styleArray: styleData });

  React.useEffect(() => {
    if (allStylesLoaded) {
      onStylesLoaded();
    }
  }, [allStylesLoaded]);

  return null;
};

export default StyleTagCore;
