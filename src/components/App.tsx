import useDynamicStyle from "./hooks/useDynamicStyle";
import useDynamicLoad from "./hooks/useDynamicLoad";

import Hi from "./uiComponents/Hi";

export default function App() {
  useDynamicStyle("app", ["outputTailwind"]);
  // const File = useDynamicLoad("uiComponents/Hi.tsx");

  console.log("App");

  return (
    <div>
      <h1 className="text-3xl font-bold">Hello, React!!</h1>
      {/* {File} */}
      <Hi />
    </div>
  );
}
