import { S, A, ActionsMap } from "./loadUserConfig";

export default function createReducer(actions: ActionsMap) {
  return function reducerNexus(state: S, action: A): S {
    const actionType = action.actionType;
    const payload = action.payload;

    if (actions[actionType]) {
      const config = actions[actionType];

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
