import React from "react";

import useAllStatesToStorage from "../hooks/useAllStatesToStorage";

import StyleTag from "../suppComponents/StyleTag";
import Hi from "../uiComponents/Hi";

export default function Main(): React.ReactElement {
  return (
    <>
      <>{useAllStatesToStorage()}</>
      <StyleTag parent="main" fileNames={["outputTailwind"]} />
      <h1 className="text-3xl font-bold">Hello, React!!</h1>
      <Hi />
    </>
  );
}
