import React from "react";
import { useStoreContext } from "../stateManage/Provider";

export default function Text2(): React.ReactElement {
  const [text2, setText2] = useStoreContext<string>("text2");

  React.useEffect(() => {
    setText2({
      type: "TEXT2",
      payload: "New Text for Text2",
    });
  }, []);

  console.log(text2);

  return <div>{text2}</div>;
}
