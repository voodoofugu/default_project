import useDynamicStyle from "../hooks/useDynamicStyle";
import Ep from "./Ep";

export default function Hi() {
  useDynamicStyle({ parent: "hi", fileNames: ["blabla"] });

  return (
    <>
      <div>Hiiii!</div>
      {/* <Ep /> */}
    </>
  );
}
