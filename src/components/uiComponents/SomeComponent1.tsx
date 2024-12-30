import React from "react";

import { useNexus, nexusUpdate } from "../../../nexus-state/src/nexus";
import StyledAtom from "../../../styled-atom/src/StyledAtom";

export default function SomeComponent1(): React.ReactElement {
  const value1 = useNexus("value1");
  const [isLoaded, setIsLoaded] = React.useState(false);

  const handleStylesLoaded = (loaded: boolean) => {
    setIsLoaded(loaded);
  };

  const handleChange1 = (e: any) => {
    nexusUpdate({
      value1: e.target.value,
    });
  };

  return (
    <>
      {/* <StyledAtom fileNames={["main-style"]} onLoad={handleStylesLoaded} /> */}
      <StyledAtom fileNames={[]} onLoad={handleStylesLoaded} />
      <p>Styles loaded: {isLoaded ? "Yes" : "No"}</p>
      <div>
        <input type="text" value={value1 || ""} onChange={handleChange1} />
        <p>Current input value: {value1}</p>
      </div>
      ____________________________
    </>
  );
}
