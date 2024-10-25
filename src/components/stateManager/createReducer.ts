import { Config } from "./store";

// Функция createReducer
export default function createReducer<StatesType>(
  actions: Config<StatesType>["actions"]
) {
  return function reducerNexus(
    state: StatesType,
    action: { type: string; payload?: Partial<StatesType> }
  ): StatesType {
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
        } as StatesType;
      }
    }

    return state;
  };
}
