import React from "react";
import context, { ActionType } from "./context";
import createReducer from "./createReducer";

type DefaultStatesT<T = any> = {
  [key: string]: T;
};

// Пример использования
export type S = typeof import("../../../nexusConfig") extends {
  initialStates: infer U;
}
  ? U
  : DefaultStatesT;

// Тип для редьюсера, использующий глобальный S
type ActionTypeLocal = {
  reducer?: (state: S, action: ActionType) => S;
};

type ActionsMap = {
  [actionKey: string]: ActionTypeLocal;
};

type Config = {
  initialStates: S;
  actions: ActionsMap;
};

// Создаём контекст с типом состояния S
type NexusContextType = {
  useGetNexus: <K extends keyof S>(stateName: K) => S[K];
  useSetNexus: () => (value: ActionType | Partial<S>) => void;
  useNexusAll: () => S;
  useSelector: <K extends keyof S>(selector: (state: S) => S[K]) => S[K];
  NexusContextProvider: (props: { children: React.ReactNode }) => JSX.Element;
};

type ProviderProps = {
  initialStates: S;
  actions: Config["actions"];
  children: React.ReactNode;
};

// NexusContext принимает тип состояния S
const NexusContext = React.createContext<NexusContextType | undefined>(
  undefined
);

// NexusProvider принимает конфигурацию состояний и редьюсера
const NexusProvider = ({ initialStates, actions, children }: ProviderProps) => {
  const reducer = createReducer(actions);
  const Nexus = context(initialStates, reducer);

  const contextValue: NexusContextType = {
    useGetNexus: Nexus.useGetNexus,
    useSetNexus: Nexus.useSetNexus,
    useNexusAll: Nexus.useNexusAll,
    useSelector: Nexus.useSelector,
    NexusContextProvider: Nexus.NexusContextProvider,
  };

  return (
    <NexusContext.Provider value={contextValue}>
      <Nexus.NexusContextProvider>{children}</Nexus.NexusContextProvider>
    </NexusContext.Provider>
  );
};

function contextExist() {
  const ctx = React.useContext(NexusContext);
  if (!ctx) {
    throw new Error("NexusProvider not found 👺");
  }
  return ctx;
}

// Хуки для получения состояния по ключу
// Перегрузка для обработки двух случаев
function useGetNexus<K extends keyof S>(stateName: K): S[K];
function useGetNexus(): S;

function useGetNexus(stateName?: keyof S) {
  const ctx = contextExist();
  return stateName ? ctx.useGetNexus(stateName) : ctx.useNexusAll();
}

const useSelector = <K extends keyof S>(selector: (state: S) => S[K]): S[K] => {
  const ctx = contextExist();
  return ctx.useSelector(selector);
};

// Хук для изменения состояния
const useSetNexus = () => {
  const ctx = contextExist();
  return ctx.useSetNexus();
};

export { useGetNexus, useSetNexus, useSelector, NexusProvider };
export type { ActionsMap, Config };
