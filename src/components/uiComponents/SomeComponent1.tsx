import React from "react";

// import { useGetNexus, useSetNexus } from "nexus-state";
import { useGetNexus, useSetNexus } from "../stateManager/store";
// import { InitialStatesType } from "../../../nexusConfig";

export default function SomeComponent1(): React.ReactElement {
  const value1 = useGetNexus("value1");
  const setNexus = useSetNexus();

  const handleChange1 = (e: any) => {
    setNexus({
      type: "UPDATE_INPUT1",
      payload: e.target.value,
    });
  };

  return (
    <div>
      <input type="text" value={value1 || ""} onChange={handleChange1} />
      <p>Current input value: {value1}</p>
    </div>
  );
}
