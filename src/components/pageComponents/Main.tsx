import React from "react";
import { selectors } from "../stateManage/GlobalStateStor";

import StyleTag from "../suppComponents/StyleTag";

export default function Main(): React.ReactElement {
  const styleLoaded = selectors.useStyleLoaded();

  return (
    <>
      <StyleTag parent="main" fileNames={["outputTailwind"]} />
      {styleLoaded ? (
        <h1 className="text-3xl font-bold">Hello, React!!</h1>
      ) : (
        "Loading..."
      )}
    </>
  );
}
