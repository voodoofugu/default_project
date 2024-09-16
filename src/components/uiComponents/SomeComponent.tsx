import React from "react";
import useNexus, { useNexusAll } from "../stateManager/store";

export default function SomeComponent(): React.ReactElement {
  const [value1, setInputValue1] = useNexus<any>("value1");
  const [value2, setInputValue2] = useNexus<any>("value2");

  const handleChange1 = (e: any) => {
    setInputValue1({
      type: "UPDATE_INPUT1",
      payload: e.target.value,
    });
  };
  const handleChange2 = (e: any) => {
    setInputValue2({
      type: "UPDATE_INPUT2",
      payload: e.target.value,
    });
  };

  return (
    <>
      <div>
        <input type="text" value={value1 || ""} onChange={handleChange1} />
        <p>Current input value: {value1}</p>
      </div>

      <div>
        <input type="text" value={value2 || ""} onChange={handleChange2} />
        <p>Current input value: {value2}</p>
      </div>
    </>
  );
}
