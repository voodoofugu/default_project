import React from "react";
import useRequest from "../hooks/useRequest";

export default function Pokemon1(): React.ReactElement {
  console.log("🚀Pokemon1");
  const { data, requestLoaded, loading } = useRequest(
    "pokemon1",
    "https://pokeapi.co/api/v2/pokemon/18"
  );

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : requestLoaded && data ? (
        <>
          <div>{data.name}</div>
          <img src={data.sprites.front_default} />
        </>
      ) : (
        <div>Error loading data</div>
      )}
    </>
  );
}
