import React from "react";
import useDynamicStyle from "../hooks/useDynamicStyle";
import useStoreContext from "../stateManager/store";
import { InitialStatesType } from "../stateManager/initialStates";

const StyleTagCore: React.FC = () => {
  const [styleData, setStyleData] =
    useStoreContext<InitialStatesType["styleData"]>("styleData");

  useDynamicStyle({ styleData, setStyleData });

  return null;
};

export default StyleTagCore;
