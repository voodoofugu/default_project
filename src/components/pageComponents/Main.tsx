import React from "react";

import StyleTag from "../suppComponents/StyleTag";
import Pokemon1 from "../uiComponents/Pokemon1";
import Pokemon2 from "../uiComponents/Pokemon2";

import SomeComponent from "../uiComponents/SomeComponent";

export default function Main(): React.ReactElement {
  return (
    // <StyleTag parent="main" fileNames={["outputTailwind"]} loadingElement="🔄">
    // <Pokemon1 />
    // <Pokemon2 />
    // </StyleTag>
    <>
      hi
      <SomeComponent />
    </>
  );
}
