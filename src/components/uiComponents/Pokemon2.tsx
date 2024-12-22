import React from "react";
import Request from "../suppComponents/Request";

export default React.memo(function Pokemon2(): React.ReactElement {
  return (
    <>
      <Request
        requestName="pokemon2_s"
        url="https://pokeapi.co/api/v2/pokemon/9"
        loadingElement={<div>Loading Pokemon...</div>}
      >
        {(data) => (
          <div>
            <h1>{data.name}</h1>
            <img src={data.sprites.front_default} alt={data.name} />
          </div>
        )}
      </Request>
    </>
  );
});
