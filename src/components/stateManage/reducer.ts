export interface InitialState {
  styleData: object;
  [key: string]: any;
}

export const initialState: InitialState = {
  styleData: {
    parent: "",
    fileNames: [],
  },
};

export interface Action {
  type: string;
  payload?: any;
}

export function reducer(draft: any, action: Action): any {
  switch (action.type) {
    case "STYLE_DATA":
      draft.styleData = action.payload;
      return draft;

    default:
      return draft;
  }
}
