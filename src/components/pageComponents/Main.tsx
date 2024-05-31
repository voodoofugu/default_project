import React from "react";

import StyleTag from "../suppComponents/StyleTag";

export default function Main(): React.ReactElement {
  return (
    <>
      <StyleTag parent="main" fileNames={["outputTailwind"]} />
      <h1 className="text-3xl font-bold">Hello, React!!</h1>
    </>
  );
}
