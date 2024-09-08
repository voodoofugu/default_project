import { actionConfig } from "./actionConfig";

function initialStates() {
  const initialState: { [key: string]: any } = {};

  for (const action in actionConfig) {
    if (actionConfig.hasOwnProperty(action)) {
      const state =
        actionConfig[action as keyof typeof actionConfig].initialState;

      // Проверяем, если initialState — это объект, берем его ключи, иначе используем само значение
      if (
        typeof state === "object" &&
        state !== null &&
        !Array.isArray(state)
      ) {
        Object.assign(initialState, state); // Объединяем значения в общий объект
      } else {
        initialState[action] = state; // Оставляем значение как есть
      }
    }
  }

  return initialState;
}
console.log("initialStates", initialStates());

function reducer(state: any, action: { type: string; payload?: any }): any {
  const type = action.type as keyof typeof actionConfig;
  const payload = action.payload;

  if (actionConfig[type]) {
    const config = actionConfig[type] as {
      initialState: any;
      reducer?: (state: any, action: any) => any;
    };

    if (config.reducer) {
      // Если кастомный редьюсер существует, используем его
      return {
        ...state,
        ...config.reducer(state, action), // Обновляем состояние с учётом изменений
      };
    } else {
      // Обновляем существующее состояние, не создавая новый объект
      return {
        ...state,
        ...payload, // Вносим изменения непосредственно в существующие ключи
      };
    }
  }

  return state;
}

export { initialStates, reducer };
