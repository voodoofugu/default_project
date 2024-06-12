// import React from "react";
// import useRequest from "../hooks/useRequest";

// export default React.memo(function Pokemon1(): React.ReactElement {
//   console.log("🚀Pokemon1 render");
//   const { data, requestLoaded } = useRequest(
//     "pokemon1",
//     "https://pokeapi.co/api/v2/pokemon/18"
//   );

//   return (
//     <>
//       {requestLoaded ? (
//         <img src={data.sprites.front_default} />
//       ) : (
//         <div>Loading...</div>
//       )}
//     </>
//   );
// });
