import React from "react";

import StyledAtom from "../../../styled-atom/src/StyledAtom";

import StateViewer from "../uiComponents/StateViewer";

import SomeComponent1 from "../uiComponents/SomeComponent1";
import SomeComponent2 from "../uiComponents/SomeComponent2";
import SomeComponent3 from "../uiComponents/SomeComponent3";

export default function Main(): React.ReactElement {
  return (
    <>
      <StateViewer />
      <StyledAtom fileNames={["outputTailwind"]} />

      <SomeComponent1 />
      <StyledAtom
        fileNames={["some-style", "main-style", "a"]}
        fallback={<div>Loading...</div>}
        encap="mainStyle"
      >
        <SomeComponent2 />
      </StyledAtom>
      <SomeComponent3 />
    </>
  );
}
