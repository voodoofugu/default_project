import React from "react";

// import { useNexus, useAction } from "nexus-state";
import { useNexus, nexusDispatch } from "../stateManager/nexus";
// import { NexusStatesT } from "../../../nexusConfig";

export default function SomeComponent1(): React.ReactElement {
  const value1 = useNexus("value1");

  // const setNexus = useAction();

  const handleChange1 = (e: any) => {
    nexusDispatch({
      type: "UPDATE_INPUT1",
      payload: e.target.value,
    });
  };

  return (
    <>
      <div>
        <input type="text" value={value1 || ""} onChange={handleChange1} />
        <p>Current input value: {value1}</p>
      </div>
    </>
  );
}
