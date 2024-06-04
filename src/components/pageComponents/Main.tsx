import React from "react";

import StyleTag from "../suppComponents/StyleTag";
import Hi from "../uiComponents/Hi";

export default function Main(): React.ReactElement {
  let stylesLoaded = false;

  return (
    <>
      <StyleTag parent="main" fileNames={["outputTailwind"]} stylesLoaded />
      {console.log(typeof StyleTag)}
      {StyleTag !== null ? (
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
