import React from "react";
import useDynamicStyle from "../hooks/useDynamicStyle";
import useNexus from "../stateManager/store";
import { InitialStatesType } from "../stateManager/initialStates";

const StyleTagCore: React.FC = () => {
  const [styleData, setStyleData] =
    useNexus<InitialStatesType["styleData"]>("styleData");

  useDynamicStyle({ styleData, setStyleData });

  return null;
};

export default StyleTagCore;
