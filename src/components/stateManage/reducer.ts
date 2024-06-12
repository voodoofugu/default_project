export interface Action {
  type: string;
  payload?: any;
}

export default function reducer(state: any, action: Action): any {
  switch (action.type) {
    // initialState ►
    case "STYLE_DATA":
      if (action.payload) {
        const { parent, fileNames, stylesLoaded } = action.payload;
        const existingIndex = state.styleData.findIndex(
          (item: { parent: string }) => item.parent === parent
        );

        if ("fileNames" in action.payload) {
          // push/update
          if (existingIndex !== -1) {
            state.styleData[existingIndex].fileNames = fileNames;
          } else {
            state.styleData.push({
              parent: parent,
              fileNames: fileNames,
              stylesLoaded: false,
            });
          }
        } else if ("stylesLoaded" in action.payload) {
          // loadeding
          if (existingIndex !== -1) {
            state.styleData[existingIndex].stylesLoaded = stylesLoaded;
          }
        } else {
          // clear
          if (existingIndex !== -1) {
            state.styleData.splice(existingIndex, 1);
          }
        }
      }
      return state;

    case "REQUEST_DATA":
      if (action.payload) {
        const { requestName, data, requestLoaded } = action.payload;

        // initial
        if (!state[requestName]) {
          state[requestName] = {};
        }

        if (data !== undefined) {
          // update
          state[requestName].data = data;
          if (!("requestLoaded" in state[requestName])) {
            state[requestName].requestLoaded = false;
          }
        } else if (requestLoaded !== undefined) {
          // update requestLoaded
          state[requestName].requestLoaded = requestLoaded;
        } else {
          // clear
          delete state[requestName];
        }
      }
      return state;

    case "TEXT1":
      return { ...state, text1: action.payload };

    case "TEXT2":
      return { ...state, text2: action.payload };

    // initialState_storeSaved ►
    case "BOOL_STATE":
      state.s_booleanState = action.payload;
      return state;

    default:
      return state;
  }
}
