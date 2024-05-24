import useDynamicStyle from "../hooks/useDynamicStyle";

export default function Ep() {
  useDynamicStyle({ parent: "ep", fileNames: ["blabla"] });

  return <div>Epppp</div>;
}
