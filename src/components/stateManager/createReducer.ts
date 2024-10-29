import { S, A, ActionsMap } from "./loadUserConfig";

export default function createReducer(actions: ActionsMap) {
  return function reducerNexus(state: S, action: A): S {
    const type = action.type as keyof typeof actions;
    const payload = action.payload;

    if (actions[type]) {
      const config = actions[type];

      if (config.reducer) {
        return config.reducer(state, action);
      } else {
        return {
          ...state,
          ...payload,
        } as S;
      }
    }

    return state;
  };
}
