import React, { useEffect, useState } from "react";
import context from "./context";
import createReducer from "./createReducer";
import loadUserConfig, { S, ActionsMap } from "./loadUserConfig";

// Создаём контекст с типом состояния S
type NexusContextType = {
  useGetNexus: <K extends keyof S>(stateName: K) => S[K];
  useSetNexus: () => (value: ActionsMap | Partial<S>) => void;
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
  const [initialStates, setInitialStates] = useState<S | null>(null);
  const [actions, setActions] = useState<ActionsMap | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadConfig = async () => {
      const config = await loadUserConfig();
      if (config) {
        setInitialStates(config.initialStates);
        setActions(config.actions);
      }
      setIsLoading(false);
    };
    loadConfig();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // или любой другой индикатор загрузки
  }

  if (!initialStates || !actions) {
    return <div>Error loading configuration</div>; // обработка ошибок
  }

  const reducer = createReducer(actions);
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
