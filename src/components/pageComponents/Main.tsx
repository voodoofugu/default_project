import React from "react";

import StyleTag from "../../../styled-atom/src/StyleTag";

import StateViewer from "../uiComponents/StateViewer";

import SomeComponent1 from "../uiComponents/SomeComponent1";
import SomeComponent2 from "../uiComponents/SomeComponent2";
import SomeComponent3 from "../uiComponents/SomeComponent3";

export default function Main(): React.ReactElement {
  return (
    <>
      <StateViewer />

      <SomeComponent1 />
      <StyleTag fileNames={["outputTailwind"]}>
        <SomeComponent2 />
      </StyleTag>
      <SomeComponent3 />
    </>
  );
}
