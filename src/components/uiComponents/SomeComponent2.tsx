import React from "react";

// import { useSetNexus } from "nexus-state";
import { useGetNexus, useSetNexus } from "../stateManager/store";

export default function SomeComponent2(): React.ReactElement {
  // const value1 = useGetNexus<string>("value1");
  // const value2 = useGetNexus<string>("value2");
  const setNexus = useSetNexus();

  // const handleChange2 = (e: any) => {
  //   setNexus({
  //     type: "UPDATE_INPUT2",
  //     payload: e.target.value,
  //   });
  // };

  const increment = () => {
    setNexus({
      type: "INCREMENT",
    });
  };

  return (
    <div>
      {/* <input type="text" value={value2 || ""} onChange={handleChange2} />
      <p>Current input value: {value2}</p> */}
      <button onClick={increment}> Increment</button>
    </div>
  );
}
