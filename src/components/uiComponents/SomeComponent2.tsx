import React, { useEffect } from "react";

import {
  // useNexus,
  useNexusSelect,
  nexusUpdate,
  // nexusTrigger,
} from "../../../nexus-state/src/nexus";

import Notification from "./Notification";

// import useStore from "../stateManager/useStore";

export default function SomeComponent2(): React.ReactElement {
  // const select = useNexus("value2");
  const select = useNexusSelect((state) => state.value3 + state.value2);

  // const [state, setState] = useStore({ name: "John" });

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
      <div className="increment">
        <button onClick={increment}>Increment</button>
      </div>

      <p>useNexusSelect value: {`${select}`}</p>
      {/* <p>proxuCount value: {`${state.name}`}</p> */}

      <Notification />
    </>
  );
}
