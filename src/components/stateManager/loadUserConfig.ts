export type A<T = any> = {
  actionType: ActionKey; // Используем ActionKey вместо string
  payload?: T;
};

export type ActionsMap = {
  [key in ActionKey]: {
    reducer?: (state: S, action: A) => S;
  };
};

// Заглушки для начальных типов
export type S = typeof import("../../../nexusConfig").initialStates;
type ActionKey = keyof typeof import("../../../nexusConfig").actions;

function createAction(reducer?: (state: S, action: A) => S) {
  return { reducer };
}

let initialStates: S = {} as S; // Инициализация как пустой объект
let actions: ActionsMap;

try {
  const config = require("../../../nexusConfig");
  initialStates = config.initialStates as S; // Приведение типа
  actions = config.actions;
} catch (error) {
  console.error(
    "Nexus failed to load the `nexusConfig`. Using default configuration.",
    error
  );
}

// Экспортируем как типизированные объекты
export { initialStates, actions, createAction };
