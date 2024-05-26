export interface InitialState {
  styleData: Array<{ string: string[] }>;
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
          (item: Array<{ string: string[] }>) => item.hasOwnProperty(parent)
        );

        if ("fileNames" in action.payload) {
          // push
          if (existingIndex !== -1) {
            draft.styleData[existingIndex][parent] = fileNames;
          } else {
            draft.styleData.push({ [parent]: fileNames });
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
