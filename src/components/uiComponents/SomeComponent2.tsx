import React, { useEffect } from "react";

import {
  useNexus,
  // useNexusSelect,
  nexusUpdate,
  // nexusEffect,
} from "../../../nexus-state/src/nexus";
// import StyleTag from "../suppComponents/StyleTag";

import Notification from "./Notification";

export default function SomeComponent2(): React.ReactElement {
  const value2 = useNexus("value2");

  useEffect(() => {
    nexusUpdate({
      notif: {
        view: true,
        img: "https://img.icons8.com/ios-glyphs/30/000000/like.png",
        text: `You got ${value2} points!`,
      },
    });
  }, [value2]);

  const increment = () => {
    nexusUpdate({
      value2: (prev) => prev + 1,
    });
  };

  return (
    <>
      <div>
        <button onClick={increment}>Increment</button>
      </div>

      <p>useNexusSelect value: {value2}</p>

      <Notification />
    </>
  );
}
