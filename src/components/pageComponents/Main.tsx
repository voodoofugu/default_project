import React from "react";
import { selectors } from "../stateManage/GlobalStateStor";

import StyleTag from "../suppComponents/StyleTag";
import Hi from "../uiComponents/Hi";

export default function Main(): React.ReactElement {
  const styleData = selectors.useStyleData();

  return (
    <>
      <StyleTag parent="main" fileNames={["outputTailwind"]} />
      {styleData ? (
        <>
          <h1 className="text-3xl font-bold">Hello, React!!</h1>
          <Hi />
        </>
      ) : (
        "Loading..."
      )}
    </>
  );
}
