import React, { createContext, useContext } from "react";
import context, { ActionType } from "./context";
import Storage from "../suppComponents/Storage";

// Обобщенный тип для редьюсера
interface ActionTypeLocal<StatesType = Record<string, unknown>> {
  reducer?: (state: StatesType, action: ActionType) => StatesType;
}

type ActionsMap<StatesType = Record<string, unknown>> = Record<
  string,
  ActionTypeLocal<StatesType>
>;

// Используйте ActionTypeLocal в Config
interface Config<StatesType = Record<string, unknown>> {
  initialStates: StatesType;
  actions: ActionsMap<StatesType>;
}

// Создаём контекст, используя динамические начальные состояния и редьюсер
const NexusContext = createContext<ReturnType<typeof context> | null>(null);

// Хуки для работы с состоянием
const useGetNexus = (stateName: string) => {
  const ctx = useContext(NexusContext);
  if (!ctx) {
    throw new Error("NexusProvider not found");
  }
  return ctx.useGetNexus(stateName);
};

const useSetNexus = () => {
  const ctx = useContext(NexusContext);
  if (!ctx) {
    throw new Error("NexusProvider not found");
  }
  return ctx.useSetNexus();
};

const useNexusAll = () => {
  const ctx = useContext(NexusContext);
  if (!ctx) {
    throw new Error("NexusProvider not found");
  }
  return ctx.useNexusAll();
};

// работа с Provider
interface ProviderProps<StatesType> {
  initialStates: StatesType;
  actions: Config<StatesType>["actions"];
  watch?: boolean;
  children: React.ReactNode;
}

// NexusProvider принимает конфигурацию состояний и редьюсера
const NexusProvider = <StatesType,>({
  initialStates,
  actions,
  watch,
  children,
}: ProviderProps<StatesType>) => {
  // Создаём редьюсер на основе переданных действий
  const reducer = createReducer<StatesType>(actions);

  // Создаём динамический контекст с помощью вашей функции context
  const NexusContextLocal = context(initialStates, reducer);

  return (
    <NexusContext.Provider value={NexusContextLocal}>
      <NexusContextLocal.NexusContextProvider>
        <Storage watch={watch} />
        {children}
      </NexusContextLocal.NexusContextProvider>
    </NexusContext.Provider>
  );
};

// Функция createReducer с дженериком State
function createReducer<StatesType = Record<string, unknown>>(
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

// Экспортируем хуки и провайдер
export { useGetNexus, useSetNexus, useNexusAll, NexusProvider, ActionsMap };
