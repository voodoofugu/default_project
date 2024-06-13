import React from "react";

import StyleTag from "../suppComponents/StyleTag";
import Text1 from "../uiComponents/Text1";
import Text2 from "../uiComponents/Text2";
import Pokemon1 from "../uiComponents/Pokemon1";

export default function Main(): React.ReactElement {
  return (
    <>
      <StyleTag
        parent="main"
        fileNames={["outputTailwind"]}
        loadingElement="🔄"
      >
        <Text1 />
        <Text2 />
      </StyleTag>

      <Pokemon1 />
    </>
  );
}
