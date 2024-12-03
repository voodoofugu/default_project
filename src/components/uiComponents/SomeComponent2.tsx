import React from "react";

import {
  useNexus,
  // useNexusSelect,
  nexusUpdate,
  // nexusEffect,
} from "../../../nexus-state/src/nexus";
// import StyleTag from "../suppComponents/StyleTag";

export default function SomeComponent2(): React.ReactElement {
  // const selectorValue = useNexusSelect((state) => state.value2 + 0) as number;
  const selectorValue = useNexus("value2");

  const increment = () => {
    nexusUpdate({
      // value2: 5,
      value2: (prev) => prev + 1,
    });
    // nexusEffect({
    //   type: "handlePopupOpen",
    //   payload: "Hello!",
    // });
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
