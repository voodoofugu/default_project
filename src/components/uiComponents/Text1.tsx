import React from "react";
import { useStoreContext } from "../stateManage/Provider";

export default function Text1(): React.ReactElement {
  const [text1, setText1] = useStoreContext<string>("text1");

  React.useEffect(() => {
    setText1({
      type: "TEXT1",
      payload: "New Text for Text1",
    });
  }, []);

  console.log(text1);

  return <div>{text1}</div>;
}
