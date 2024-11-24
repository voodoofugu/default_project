import React from "react";

import { useNexusSelect, nexusDispatch } from "../../../nexus-state/src/nexus";
// import StyleTag from "../suppComponents/StyleTag";

export default function SomeComponent2(): React.ReactElement {
  const selectorValue = useNexusSelect(
    (state) => state.value1 + state.value2
  ) as number;

  const increment = () => {
    nexusDispatch({
      type: "INCREMENT",
    });
  };

  return (
    <>
      {/* <StyleTag fileNames={["outputTailwind"]} /> */}
      <div>
        <button onClick={increment}>Increment</button>
      </div>

      <p>useNexusSelect value: {selectorValue}</p>
    </>
  );
}
