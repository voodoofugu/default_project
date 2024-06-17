import React from "react";
import Request from "../suppComponents/Request";
import Image from "../suppComponents/Image";

export default function Pokemon1(): React.ReactElement {
  return (
    <Request
      requestName="s_pokemon1"
      url="https://pokeapi.co/api/v2/pokemon/18"
      loadingElement={<div>Loading Pokemon...</div>}
    >
      {(data) => (
        <div>
          <h1>{data.name}</h1>
          <Image
            width={96}
            height={96}
            src={data.sprites.front_default}
            alt={data.name}
          />
        </div>
      )}
    </Request>
  );
}
