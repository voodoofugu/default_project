import React from "react";
import useDynamicStyle from "../hooks/useDynamicStyle";
import { useStoreContext } from "../stateManage/Provider";
import { InitialStatesType } from "../stateManage/initialStates";

const StyleTagCore: React.FC = () => {
  const [styleData, setStyleData] =
    useStoreContext<InitialStatesType["styleData"]>("styleData");

  console.log(styleData);

  useDynamicStyle({ styleData, setStyleData });

  return null;
};

export default StyleTagCore;
