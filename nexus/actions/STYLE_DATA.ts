// import { nexusAction } from "../../nexus-state/src/nexus";

export interface StyleData {
  id: string;
  fileNames: string[];
  totalFiles?: number;
  stylesLoaded?: boolean;
}

// const STYLE_DATA = nexusAction((state, action) => {
//   if (action.payload) {
//     const { id, fileNames, stylesLoaded } = action.payload;
//     const existingIndex = state.styleData.findIndex(
//       (item: StyleData) => item.id === id
//     );

//     const newStyleData = [...state.styleData];

//     if ("fileNames" in action.payload) {
//       // PUSH/UPDATE
//       // получаем обязательно fileNames
//       if (existingIndex !== -1) {
//         newStyleData[existingIndex] = {
//           ...newStyleData[existingIndex],
//           fileNames,
//         };
//       } else {
//         newStyleData.push({
//           id: id,
//           fileNames: fileNames,
//           stylesLoaded: false,
//         });
//       }
//     } else if ("stylesLoaded" in action.payload) {
//       // LOADING
//       // получаем обязательно stylesLoaded
//       if (existingIndex !== -1) {
//         newStyleData[existingIndex] = {
//           ...newStyleData[existingIndex],
//           stylesLoaded,
//         };
//       }
//     } else {
//       // CLEAR
//       // получаем только id
//       if (existingIndex !== -1) {
//         newStyleData.splice(existingIndex, 1);
//       }
//     }

//     return {
//       ...state,
//       styleData: newStyleData,
//     };
//   }
//   return state;
// });

// export default STYLE_DATA;
