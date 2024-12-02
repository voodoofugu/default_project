import { StyleData } from "./actions/STYLE_DATA";

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
  searchText: "",
  searchData: [] as string[],

  value1: "",
  value2: 0,
  value3: "",
  value4: {
    a: 1,
    b: "hi",
  } as { a: number; b: string },
  styleData: [] as StyleData[],
  pokemon1_s: { data: null, requestLoaded: false } as PokemonState,
  pokemon2_s: { data: null, requestLoaded: false } as PokemonState,
  value2_l: false,
};

// const UPDATE_INPUT1 = nexusAction("value1");
// const INCREMENT = nexusAction((state) => ({
//   ...state,
//   value2: state.value2 + 1,
// }));

// Действия
export const actions = {
  // SOME_ACTION2: nexusAction((state, action) => ({
  //   ...state,
  //   ...action.payload,
  // })),

  // REQUEST_DATA: nexusAction((state, action) => {
  //   if (action.payload) {
  //     const { requestName, data, requestLoaded } = action.payload;

  //     // Проверяем, что state[requestName] — это объект
  //     const currentState = state[requestName as keyof StatesT] || {};
  //     const newRequestData: { data?: unknown; requestLoaded?: boolean } =
  //       typeof currentState === "object" && currentState !== null
  //         ? { ...currentState }
  //         : {};

  //     if (data !== undefined) {
  //       // update
  //       newRequestData.data = data;
  //       if (!("requestLoaded" in newRequestData)) {
  //         newRequestData.requestLoaded = false;
  //       }
  //     }
  //     if (requestLoaded !== undefined) {
  //       // update requestLoaded
  //       newRequestData.requestLoaded = requestLoaded;
  //     } else {
  //       // clear
  //       delete state[requestName as keyof StatesT];
  //       console.log("requestName", requestName);
  //     }

  //     return {
  //       ...state,
  //       [requestName]: newRequestData,
  //     };
  //   }

  //   return state;
  // }),

  // UPDATE_INPUT2: nexusAction("value2"),

  INCREMENT: {
    reducer: (state: StatesT, action: { payload: number }) => ({
      ...state,
      value2: state.value2 + action.payload,
    }),
  },

  UPDATE_INPUT1: {
    reducer: (state: StatesT, action: { payload: string }) => ({
      ...state,
      value1: action.payload,
    }),
  },

  handlePopupOpen: {
    action: (payload: string) => {
      console.log("Popup Opened with payload:", payload);
    },
  },
};
