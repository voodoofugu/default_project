import React from "react";
import useNexus from "../stateManager/store";

export default function SomeComponent(): React.ReactElement {
  const [someData, setSomeData] = useNexus<any>("value1");

  // React.useEffect(() => {
  //   setSomeData({
  //     type: "SOME_ACTION1",
  //     payload: {
  //       value1: "YO!",
  //     },
  //   });
  // }, []);

  console.log("someData", someData);

  return <div>{someData !== undefined ? someData : "Loading..."}</div>;
}
