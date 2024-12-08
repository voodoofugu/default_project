import React, { useEffect } from "react";

import {
  // useNexus,
  useNexusSelect,
  nexusUpdate,
  // nexusTrigger,
} from "../../../nexus-state/src/nexus";
import StyleTag from "../suppComponents/StyleTag";

import Notification from "./Notification";

export default function SomeComponent2(): React.ReactElement {
  // const value2 = useNexus("value2");
  const select = useNexusSelect((state) => state.value3 + state.value2);

  useEffect(() => {
    nexusUpdate({
      notif: {
        view: true,
        img: "https://img.icons8.com/ios-glyphs/30/000000/like.png",
        // text: `You got ${select} points!`,
      },
    });
  }, [select]);

  const increment = () => {
    nexusUpdate({
      value2: (prev) => prev + 1,
    });
  };

  return (
    <>
      <StyleTag fileNames={["outputTailwind"]} />
      <div>
        <button onClick={increment}>Increment</button>
      </div>

      <p>useNexusSelect value: {`${select}`}</p>

      <Notification />
    </>
  );
}
