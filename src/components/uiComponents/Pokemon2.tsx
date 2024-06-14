import React from "react";
import StyleTag from "../suppComponents/StyleTag";
import useRequest from "../hooks/useRequest";

export default React.memo(function Pokemon2(): React.ReactElement {
  console.log("🚀Pokemon2");
  const { data, requestLoaded } = useRequest(
    "pokemon2",
    "https://pokeapi.co/api/v2/pokemon/9"
  );

  return (
    <>
      <StyleTag parent="hi" fileNames={["hi"]} />
      {requestLoaded ? (
        <>
          <div>{data.name}</div>
          <img src={data.sprites.front_default} />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
});
