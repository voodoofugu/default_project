import React from "react";

import { selectors } from "../stateManage/GlobalStateStor";

import useAllStatesToStorage from "../hooks/useAllStatesToStorage";
import useStatesToStor from "../hooks/useStatesToStor";
import useDynamicStyle from "../hooks/useDynamicStyle";

import StyleTag from "../suppComponents/StyleTag";
import Hi from "../uiComponents/Hi";

export default function Main(): React.ReactElement {
  return (
    <>
      <>{useAllStatesToStorage()}</>
      {/* <>
        {useStatesToStor("STYLE_DATA", {
          parent: "main",
          fileNames: ["outputTailwind"],
        })}
      </> */}
      <StyleTag />
      <h1 className="text-3xl font-bold">Hello, React!!</h1>
      <Hi />
    </>
  );
}
