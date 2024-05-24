import React from "react";
import useDynamicStyle from "./hooks/useDynamicStyle";
import useDynamicLoad from "./hooks/useDynamicLoad";

import Hi from "./uiComponents/Hi";
import StyleTag from "./suppComponents/StyleTag";

export default function App(): React.ReactElement {
  // useDynamicStyle({ parent: "app", fileNames: ["outputTailwind"] });
  // const File = useDynamicLoad("uiComponents/Hi.tsx");

  console.log("App");

  return (
    <div>
      <StyleTag parent="app" fileNames={["outputTailwind"]} />
      <h1 className="text-3xl font-bold">Hello, React!!</h1>
      {/* {File} */}
      <Hi />
    </div>
  );
}
