import React from "react";

import StyleTag from "../suppComponents/StyleTag";
import Hi from "../uiComponents/Hi";

export default function Main(): React.ReactElement {
  return (
    <>
      <StyleTag parent="main" fileNames={["outputTailwind", "blabla"]} />
      <h1 className="text-3xl font-bold">Hello, React!!</h1>
      {/* <Hi /> */}
    </>
  );
}
