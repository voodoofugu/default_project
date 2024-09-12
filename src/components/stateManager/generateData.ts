import { initialStates, actions } from "../../../nexusConfig";

function reducer(state: any, action: { type: string; payload?: any }): any {
  const type = action.type as keyof typeof actions;
  const payload = action.payload;

  if (actions[type]) {
    const config = actions[type] as {
      initialState: any;
      reducer?: (state: any, action: any) => any;
    };

    if (config.reducer) {
      return {
        ...state,
        ...config.reducer(state, action),
      };
    } else {
      return {
        ...state,
        ...payload,
      };
    }
  }

  return state;
}

export { initialStates, reducer };
