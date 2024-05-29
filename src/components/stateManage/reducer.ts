export interface InitialState {
  styleData: Array<{ parent: string; fileNames?: string }>;
  [key: string]: any;
}

export const initialState: InitialState = {
  styleData: [],
};

export interface Action {
  type: string;
  payload?: any;
}

export function reducer(draft: any, action: Action): any {
  switch (action.type) {
    case "STYLE_DATA":
      if (action.payload) {
        const { parent, fileNames } = action.payload;
        const existingIndex = draft.styleData.findIndex(
          (item: InitialState) => item.parent === parent
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

    default:
      return draft;
  }
}
