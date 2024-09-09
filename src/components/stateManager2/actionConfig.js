export const actionConfig = {
  SOME_ACTION1: { initialState: { value1: "123" } },
  SOME_ACTION2: { initialState: { value2: false } },

  STYLE_DATA: {
    initialState: { styleData: [] },
    reducer(state, action) {
      if (action.payload) {
        const { parent, fileNames, stylesLoaded } = action.payload;
        const existingIndex = state.styleData.findIndex(
          (item) => item.parent === parent
        );

        const newStyleData = [...state.styleData];

        if ("fileNames" in action.payload) {
          // push/update
          if (existingIndex !== -1) {
            newStyleData[existingIndex] = {
              ...newStyleData[existingIndex],
              fileNames,
            };
          } else {
            newStyleData.push({
              parent: parent,
              fileNames: fileNames,
              stylesLoaded: false,
            });
          }
        } else if ("stylesLoaded" in action.payload) {
          // loadeding
          if (existingIndex !== -1) {
            newStyleData[existingIndex] = {
              ...newStyleData[existingIndex],
              stylesLoaded,
            };
          }
        } else {
          // clear
          if (existingIndex !== -1) {
            newStyleData.splice(existingIndex, 1);
          }
        }

        return {
          ...state,
          styleData: newStyleData,
        };
      }
      return state;
    },
  },

  REQUEST_DATA: {
    initialState: {
      s_pokemon1: { data: null, requestLoaded: false },
      s_pokemon2: { data: null, requestLoaded: false },
    },
    reducer(state, action) {
      if (action.payload) {
        const { requestName, data, requestLoaded } = action.payload;

        const newRequestData = { ...state[requestName] };

        if (data !== undefined) {
          // update
          newRequestData.data = data;
          if (!("requestLoaded" in newRequestData)) {
            newRequestData.requestLoaded = false;
          }
        }
        if (requestLoaded !== undefined) {
          // update requestLoaded
          newRequestData.requestLoaded = requestLoaded;
        } else {
          // clear
          delete newRequestData[requestName];
          console.log("requestName", requestName);
        }

        return {
          ...state,
          [requestName]: newRequestData,
        };
      }

      return state;
    },
  },
};
