import React from "react";
import context, { ActionType } from "./context";
import createReducer from "./createReducer";

// Обобщенный тип для редьюсера
type ActionTypeLocal<StatesType = Record<string, unknown>> = {
  reducer?: (state: StatesType, action: ActionType) => StatesType;
};

type ActionsMap<StatesType = Record<string, unknown>> = {
  [actionKey: string]: ActionTypeLocal<StatesType>;
};

type Config<StatesType = Record<string, unknown>> = {
  initialStates: StatesType;
  actions: ActionsMap<StatesType>;
};

// Создаём контекст, принимающий тип состояния StatesType
type NexusContextType<StatesType> = {
  useGetNexus: <K extends keyof StatesType>(stateName: K) => StatesType[K];
  useSetNexus: () => (value: ActionType | Partial<StatesType>) => void;
  useNexusAll: () => StatesType;
  useSelector: <K extends keyof StatesType>(
    selector: (state: StatesType) => StatesType[K]
  ) => StatesType[K]; // Добавлено
  NexusContextProvider: (props: { children: React.ReactNode }) => JSX.Element;
};

type ProviderProps<StatesType> = {
  initialStates: StatesType;
  actions: Config<StatesType>["actions"];
  watch?: boolean;
  children: React.ReactNode;
};

// NexusContext принимает тип состояния StatesType
const NexusContext = React.createContext<NexusContextType<any> | undefined>(
  undefined
);

// NexusProvider принимает конфигурацию состояний и редьюсера
const NexusProvider = <StatesType extends Record<string, unknown>>({
  initialStates,
  actions,
  children,
}: ProviderProps<StatesType>) => {
  const reducer = createReducer<StatesType>(actions);
  const Nexus = context<StatesType>(initialStates, reducer);

  const contextValue: NexusContextType<StatesType> = {
    useGetNexus: Nexus.useGetNexus,
    useSetNexus: Nexus.useSetNexus,
    useNexusAll: Nexus.useNexusAll,
    useSelector: Nexus.useSelector, // Добавлено
    NexusContextProvider: Nexus.NexusContextProvider,
  };

  return (
    <NexusContext.Provider value={contextValue}>
      <Nexus.NexusContextProvider>{children}</Nexus.NexusContextProvider>
    </NexusContext.Provider>
  );
};

// Хуки для получения состояния по ключу
const useGetNexus = <K extends keyof ReturnType<typeof useNexusAll>>(
  stateName?: K
): ReturnType<typeof useNexusAll>[K] | ReturnType<typeof useNexusAll> => {
  const ctx = React.useContext(NexusContext);
  if (!ctx) {
    throw new Error("NexusProvider not found");
  }

  // Если `stateName` не указан, возвращаем всё состояние
  if (!stateName) {
    return ctx.useNexusAll();
  }

  // Иначе, возвращаем значение по указанному ключу
  return ctx.useGetNexus(stateName);
};

// Хук для изменения состояния
const useSetNexus = () => {
  const ctx = React.useContext(NexusContext);
  if (!ctx) {
    throw new Error("NexusProvider not found");
  }
  return ctx.useSetNexus();
};

// Хук для получения всех состояний
const useNexusAll = () => {
  const ctx = React.useContext(NexusContext);
  if (!ctx) {
    throw new Error("NexusProvider not found");
  }
  return ctx.useNexusAll();
};

const useSelector = <K extends keyof ReturnType<typeof useNexusAll>>(
  selector: (
    state: ReturnType<typeof useNexusAll>
  ) => ReturnType<typeof useNexusAll>[K]
): ReturnType<typeof useNexusAll>[K] => {
  const ctx = React.useContext(NexusContext);
  if (!ctx) {
    throw new Error("NexusProvider not found");
  }

  // Используем селектор для получения состояния
  return ctx.useSelector(selector);
};

export { useGetNexus, useSetNexus, useSelector, NexusProvider };
export type { ActionsMap, Config };
