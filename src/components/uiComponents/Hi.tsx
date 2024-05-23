import useDynamicStyle from "../hooks/useDynamicStyle";
import Ep from "./Ep";

export default function Hi() {
  useDynamicStyle("hi", ["blabla"]);

  return (
    <>
      <div>Hiiii!</div>
      {/* <Ep /> */}
    </>
  );
}
