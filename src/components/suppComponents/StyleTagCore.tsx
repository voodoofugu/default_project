import React from "react";
import useDynamicStyle from "../hooks/useDynamicStyle";
import { selectors } from "../stateManage/GlobalStateStor";

const StyleTagCore = (): React.ReactElement => {
  const styleData = selectors.useStyleData();

  useDynamicStyle({ styleArray: styleData });

  React.useEffect(() => {
    return () => {
      console.log("Component unmounted");
    };
  }, []);

  return null;
};

export default StyleTagCore;
