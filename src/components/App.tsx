import useDynamicStyle from "./hooks/useDynamicStyle";

export default function App() {
  useDynamicStyle(["outputTailwind"]);

  return (
    <div>
      <h1 className="text-3xl font-bold">Hello, React!</h1>
    </div>
  );
}
