import React from "react";
import useNexus from "../stateManager/store";

export default function SomeComponent1(): React.ReactElement {
  const [value1, setInputValue1] = useNexus<string>("value1");

  const handleChange1 = (e: any) => {
    setInputValue1({
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
