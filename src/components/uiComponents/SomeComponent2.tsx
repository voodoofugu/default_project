import React from "react";
import useNexus from "../stateManager/store";

export default function SomeComponent2(): React.ReactElement {
  const [value2, setInputValue2] = useNexus<string>("value2");
  const [value1, setInputValue1] = useNexus<string>("value1");

  const handleChange2 = (e: any) => {
    setInputValue2({
      type: "UPDATE_INPUT2",
      payload: e.target.value,
    });
  };

  return (
    <div>
      <input type="text" value={value2 || ""} onChange={handleChange2} />
      <p>Current input value: {value2}</p>
    </div>
  );
}
