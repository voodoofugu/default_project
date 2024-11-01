import { S, A, ActionsType } from "./loadUserConfig";

export default function createReducer(actions: ActionsType) {
  return function reducerNexus(state: S, action: A): S {
    const actionType = action.type;
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
