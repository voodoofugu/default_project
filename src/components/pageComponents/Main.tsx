import React from "react";

import StyleTag from "../suppComponents/StyleTag";
import Pokemon1 from "../uiComponents/Pokemon1";
import Pokemon2 from "../uiComponents/Pokemon2";

import SomeComponent1 from "../uiComponents/SomeComponent1";
import SomeComponent2 from "../uiComponents/SomeComponent2";

export default function Main(): React.ReactElement {
  return (
    // <StyleTag parent="main" fileNames={["outputTailwind"]} loadingElement="🔄">
    //   hi
    //   <Pokemon1 />
    //   <Pokemon2 />
    // </StyleTag>
    <>
      <SomeComponent1 />
      <SomeComponent2 />
    </>
  );
}
