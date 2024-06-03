import StyleTag from "../suppComponents/StyleTag";

export default function Hi(): React.ReactElement {
  return (
    <>
      <StyleTag parent="hi" fileNames={["hi"]} />
      <div>Hi</div>
    </>
  );
}
