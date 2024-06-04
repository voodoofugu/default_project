export interface Action {
  type: string;
  payload?: any;
}

export function reducer(draft: any, action: Action): any {
  switch (action.type) {
    // initialState ►
    case "STYLE_DATA":
      if (action.payload) {
        const { parent, fileNames, stylesLoaded } = action.payload;
        const existingIndex = draft.styleData.findIndex(
          (item: { parent: string }) => item.parent === parent
        );

        if ("fileNames" in action.payload) {
          // push/update
          if (existingIndex !== -1) {
            draft.styleData[existingIndex].fileNames = fileNames;
          } else {
            draft.styleData.push({
              parent: parent,
              fileNames: fileNames,
              stylesLoaded: false,
            });
          }
        } else if ("stylesLoaded" in action.payload) {
          // styles loaded
          if (existingIndex !== -1) {
            draft.styleData[existingIndex].stylesLoaded = stylesLoaded;
          }
        } else {
          // clear
          if (existingIndex !== -1) {
            draft.styleData.splice(existingIndex, 1);
          }
        }
      }
      return draft;

    // initialState_storeSaved ►
    case "BOOL_STATE":
      draft.s_booleanState = action.payload;
      return draft;

    default:
      return draft;
  }
}
