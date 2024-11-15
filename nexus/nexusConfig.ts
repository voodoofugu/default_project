import { createAction } from "../nexus-state/src/nexus";

// Определение интерфейсов для состояния и действий
export interface StyleData {
  parent: string;
  fileNames: string[];
  totalFiles?: number;
  stylesLoaded?: boolean;
}

interface PokemonState {
  data: unknown | null;
  requestLoaded: boolean;
}

type InitialStatesT = typeof initialStates;
type InitialActionsT = typeof actions;

declare global {
  interface StatesT extends InitialStatesT {}
  interface ActionsT extends InitialActionsT {}
}

// Начальное состояние
export const initialStates = {
  value1: "",
  value2: 0,
  value3: "",
  value4: "",
  styleData: [] as StyleData[],
  pokemon1_s: { data: null, requestLoaded: false } as PokemonState,
  pokemon2_s: { data: null, requestLoaded: false } as PokemonState,
  value2_l: false,
};

const UPDATE_INPUT1 = createAction((state, action) => ({
  ...state,
  value1: action.payload,
}));
const INCREMENT = createAction((state) => ({
  ...state,
  value2: state.value2 + 1,
}));

// Действия
export const actions = {
  SOME_ACTION2: createAction((state, action) => ({
    ...state,
    ...action.payload,
  })),

  STYLE_DATA: createAction((state, action) => {
    if (action.payload) {
      const { parent, fileNames, stylesLoaded } = action.payload;
      const existingIndex = state.styleData.findIndex(
        (item: StyleData) => item.parent === parent
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
  }),

  REQUEST_DATA: createAction((state, action) => {
    if (action.payload) {
      const { requestName, data, requestLoaded } = action.payload;

      // Проверяем, что state[requestName] — это объект
      const currentState = state[requestName as keyof StatesT] || {};
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
        delete state[requestName as keyof StatesT];
        console.log("requestName", requestName);
      }

      return {
        ...state,
        [requestName]: newRequestData,
      };
    }

    return state;
  }),

  UPDATE_INPUT1,

  UPDATE_INPUT2: createAction((state, action) => ({
    ...state,
    value2: action.payload,
  })),

  INCREMENT,
};
