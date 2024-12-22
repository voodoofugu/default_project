import React from "react";

import { useNexus, nexusUpdate } from "../../../nexus-state/src/nexus";
import StyleTag from "../../../styled-flex/src/StyleTag";

export default function SomeComponent1(): React.ReactElement {
  const value1 = useNexus("value1");

  const handleChange1 = (e: any) => {
    nexusUpdate({
      value1: e.target.value,
    });
  };

  return (
    <>
      <StyleTag fileNames={["hi"]} />
      <div>
        <input type="text" value={value1 || ""} onChange={handleChange1} />
        <p>Current input value: {value1}</p>
      </div>
      ____________________________
    </>
  );
}
