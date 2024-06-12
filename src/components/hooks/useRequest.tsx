// import React from "react";
// import { selectors, useDispatch } from "../stateManage/GlobalStateStor";

// export default function useRequest(requestName: string, url: string) {
//   const requestNameNew = `use${
//     requestName.charAt(0).toUpperCase() + requestName.slice(1)
//   }`;
//   const requestData = selectors[requestNameNew]();
//   const dispatch = useDispatch();

//   React.useEffect(() => {
//     let isMounted = true;

//     const fetchData = async () => {
//       try {
//         const response = await fetch(url);

//         if (!isMounted) return;

//         if (!response.ok) {
//           throw new Error(response.statusText);
//         }

//         const json = await response.json();
//         if (isMounted) {
//           dispatch({
//             type: "REQUEST_DATA",
//             payload: {
//               requestName,
//               data: json,
//             },
//           });
//         }
//       } catch (error) {
//         console.error(error);
//         if (isMounted) {
//           dispatch({
//             type: "REQUEST_DATA",
//             payload: {
//               requestName,
//               data: "🚫",
//             },
//           });
//         }
//       } finally {
//         if (isMounted) {
//           dispatch({
//             type: "REQUEST_DATA",
//             payload: {
//               requestName,
//               requestLoaded: true,
//             },
//           });
//         }
//       }
//     };

//     fetchData();

//     return () => {
//       isMounted = false;
//       dispatch({
//         type: "REQUEST_DATA",
//         payload: {
//           requestName,
//         },
//       });
//     };
//   }, [requestName, url]);

//   const request = requestData ? requestData : undefined;

//   return {
//     data: request ? request.data : undefined,
//     requestLoaded:
//       request && request.data !== "🚫" ? request.requestLoaded : undefined,
//   };
// }
