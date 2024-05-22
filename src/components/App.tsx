import useDynamicStyle from "./hooks/useDynamicStyle";
import useDynamicLoad from "./hooks/useDynamicLoad";

export default function App() {
  useDynamicStyle(["outputTailwind"]);
  const File = useDynamicLoad("uiComponents/Hi.tsx");

  return (
    <div>
      <h1 className="text-3xl font-bold">Hello, React!</h1>
      {File}
    </div>
  );
}
