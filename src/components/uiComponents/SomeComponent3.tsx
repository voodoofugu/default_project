import React from "react";
import useStore from "../stateManager/useStore";

export default function SomeComponent3(): React.ReactElement {
  const [count, setCount] = useStore("count");

  const increment = () => {
    setCount((prevCount: number) => prevCount + 1);
  };

  return (
    <>
      <h1>Count: {count}</h1>
      <button onClick={increment}>Increment</button>
      <br />
      ____________________________
    </>
  );
}
