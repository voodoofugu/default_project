import React from "react";
import context from "./context";
import createReducer from "./createReducer";
import { S, A, initialStates, actions } from "./loadUserConfig";

// Создаём контекст с типом состояния S
type NexusContextType = {
  useGetNexus: <K extends keyof S>(stateName: K) => S[K];
  useSetNexus: () => ({ actionType, payload }: A) => void;
  useNexusAll: () => S;
  useSelector: <K extends keyof S>(selector: (state: S) => S[K]) => S[K];
};

const NexusContext = React.createContext<NexusContextType | undefined>(
  undefined
);

// NexusProvider принимает конфигурацию состояний и редьюсера
const NexusProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  if (!initialStates || !actions) {
    console.error("Error loading nexusConfig 👺");
    return <>{children}</>; // Обернуть в React Fragment
  }

  const reducer = createReducer(actions); // Убедитесь, что передаёте ActionsMap
  const Nexus = context(initialStates, reducer);

  const contextValue: NexusContextType = {
    useGetNexus: Nexus.useGetNexus,
    useSetNexus: Nexus.useSetNexus,
    useNexusAll: Nexus.useNexusAll,
    useSelector: Nexus.useSelector,
  };

  return (
    <NexusContext.Provider value={contextValue}>
      <Nexus.NexusContextProvider>{children}</Nexus.NexusContextProvider>
    </NexusContext.Provider>
  );
};

// Хуки для получения состояния по ключу
function contextExist() {
  const ctx = React.useContext(NexusContext);
  if (!ctx) {
    throw new Error("NexusProvider not found 👺");
  }
  return ctx;
}

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
