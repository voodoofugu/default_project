export interface Action {
  type: string;
  payload?: any;
}

export function reducer(draft: any, action: Action): any {
  switch (action.type) {
    // initialState ►
    case "STYLE_DATA":
      if (action.payload) {
        const { parent, fileNames } = action.payload;
        const existingIndex = draft.styleData.findIndex(
          (item: { parent: string; fileNames?: string }) =>
            item.parent === parent
        );

        if ("fileNames" in action.payload) {
          // push or update
          if (existingIndex !== -1) {
            draft.styleData[existingIndex].fileNames = fileNames;
          } else {
            draft.styleData.push({ parent: parent, fileNames: fileNames });
          }
        } else {
          // clear
          if (existingIndex !== -1) {
            draft.styleData.splice(existingIndex, 1);
          }
        }
      }
      return draft;

    case "STYLE_LOADED":
      draft.styleLoaded = true;
      return draft;

    // initialState_storeSaved ►
    case "BOOL_STATE":
      draft.s_booleanState = !draft.booleanState;
      return draft;

    default:
      return draft;
  }
}
