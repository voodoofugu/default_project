import { ActionsMap } from "./src/components/stateManager/store";

// Определение интерфейсов для состояния и действий
interface StyleData {
  parent: string;
  fileNames: string[];
  stylesLoaded: boolean;
}

interface PokemonState {
  data: unknown | null;
  requestLoaded: boolean;
}

export type InitialStatesType = {
  value1: number;
  value2: number;
  value3: string;
  value4: string;
  styleData: StyleData[];
  pokemon1_s: PokemonState;
  pokemon2_s: PokemonState;
  value2_l: boolean;
};

// Начальное состояние
export const initialStates: InitialStatesType = {
  value1: 1,
  value2: 2,
  value3: "3",
  value4: "4",
  styleData: [],
  pokemon1_s: { data: null, requestLoaded: false },
  pokemon2_s: { data: null, requestLoaded: false },
  value2_l: false,
};

// Действия
export const actions: ActionsMap<InitialStatesType> = {
  SOME_ACTION1: {},
  SOME_ACTION2: {
    reducer(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },

  STYLE_DATA: {
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
          // loading
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
    reducer(state, action) {
      if (action.payload) {
        const { requestName, data, requestLoaded } = action.payload;

        // Проверяем, что state[requestName] — это объект
        const currentState =
          state[requestName as keyof InitialStatesType] || {};
        const newRequestData: { data?: unknown; requestLoaded?: boolean } =
          typeof currentState === "object" && currentState !== null
            ? { ...currentState }
            : {};

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
          delete state[requestName as keyof InitialStatesType];
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

  UPDATE_INPUT1: {
    reducer(state, action) {
      return {
        ...state,
        value1: action.payload,
      };
    },
  },

  UPDATE_INPUT2: {
    reducer(state, action) {
      return {
        ...state,
        value2: action.payload,
      };
    },
  },

  INCREMENT: {
    reducer(state) {
      return {
        ...state,
        value2: state.value2 + 1,
      };
    },
  },
};
