// import React from "react";
// import StyleTag from "../suppComponents/StyleTag";
// import useRequest from "../hooks/useRequest";

// export default React.memo(function Pokemon2(): React.ReactElement {
//   console.log("🚀Pokemon2 render");
//   const { data, requestLoaded } = useRequest(
//     "pokemon2",
//     "https://pokeapi.co/api/v2/pokemon/8"
//   );

//   return (
//     <>
//       <StyleTag parent="hi" fileNames={["hi"]} />
//       <div>Hi</div>
//       {requestLoaded ? (
//         <img src={data.sprites.front_default} />
//       ) : (
//         <div>Loading...</div>
//       )}
//     </>
//   );
// });
