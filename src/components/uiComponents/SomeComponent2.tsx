import React from "react";

import {
  useNexusSelect,
  nexusUpdate,
  nexusDispatch,
} from "../../../nexus-state/src/nexus";
// import StyleTag from "../suppComponents/StyleTag";

export default function SomeComponent2(): React.ReactElement {
  const selectorValue = useNexusSelect(
    (state) => state.value1 + state.value2
  ) as number;

  const increment = () => {
    nexusUpdate({
      value2: (prev) => prev + 1,
    });
    // nexusDispatch({
    //   type: "handlePopupOpen",
    //   payload: "Hello!",
    // });
    // nexusDispatch({
    //   type: "handlePopupOpen",
    //   payload: "Hello!",
    // });
    // nexusDispatch({
    //   type: "UPDATE_INPUT2",
    //   payload: 4,
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
