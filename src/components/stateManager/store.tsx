import React, { createContext, useContext } from "react";
import context, { ActionType } from "./context";
import Storage from "../suppComponents/Storage";

// Обобщённый тип для редьюсера
interface ActionTypeLocal<StatesType = Record<string, unknown>> {
  reducer?: (
    state: StatesType,
    action: ActionType & { payload?: Partial<StatesType> }
  ) => StatesType;
}

interface ActionsMap<StatesType = Record<string, unknown>> {
  [actionKey: string]: ActionTypeLocal<StatesType>;
}

interface Config<StatesType = Record<string, unknown>> {
  initialStates: StatesType;
  actions: ActionsMap<StatesType>;
}

// Создаём контекст с типом состояния
interface NexusContextType<StatesType> {
  useGetNexus: <K extends keyof StatesType>(stateName: K) => StatesType[K];
  useSetNexus: () => (value: ActionType | Partial<StatesType>) => void;
  useNexusAll: () => StatesType;
  NexusContextProvider: ({
    children,
  }: {
    children: React.ReactNode;
  }) => JSX.Element;
}

// Устанавливаем контекст с обобщенным типом
const NexusContext = createContext<NexusContextType<any> | null>(null);

// Хук для получения состояния по ключу
const useGetNexus = <K extends keyof ReturnType<typeof useNexusAll>>(
  stateName: K
) => {
  const ctx = useContext(NexusContext);
  if (!ctx) {
    throw new Error("NexusProvider not found");
  }
  return ctx.useGetNexus(stateName);
};

// Хук для изменения состояния
const useSetNexus = () => {
  const ctx = useContext(NexusContext);
  if (!ctx) {
    throw new Error("NexusProvider not found");
  }
  return ctx.useSetNexus();
};

// Хук для получения всех состояний
const useNexusAll = () => {
  const ctx = useContext(NexusContext);
  if (!ctx) {
    throw new Error("NexusProvider not found");
  }
  return ctx.useNexusAll();
};

interface ProviderProps<StatesType> {
  initialStates: StatesType;
  actions: Config<StatesType>["actions"];
  watch?: boolean;
  children: React.ReactNode;
}

// NexusProvider принимает конфигурацию состояний и редьюсера
const NexusProvider = <StatesType extends Record<string, unknown>>({
  initialStates,
  actions,
  watch,
  children,
}: ProviderProps<StatesType>) => {
  const reducer = createReducer<StatesType>(actions);
  const nexus = context<StatesType>(initialStates, reducer);

  const contextValue: NexusContextType<StatesType> = {
    useGetNexus: nexus.useGetNexus,
    useSetNexus: nexus.useSetNexus,
    useNexusAll: nexus.useNexusAll,
    NexusContextProvider: nexus.NexusContextProvider,
  };

  return (
    <NexusContext.Provider value={contextValue}>
      <nexus.NexusContextProvider>
        <Storage watch={watch} />
        {children}
      </nexus.NexusContextProvider>
    </NexusContext.Provider>
  );
};

// Функция createReducer
function createReducer<StatesType>(actions: ActionsMap<StatesType>) {
  return function reducerNexus(
    state: StatesType,
    action: ActionType & { payload?: Partial<StatesType> }
  ): StatesType {
    const type = action.type as keyof typeof actions;

    if (actions[type]) {
      const config = actions[type];

      if (config.reducer) {
        return config.reducer(state, action);
      } else {
        return {
          ...state,
          ...action.payload, // Теперь здесь будет корректный тип
        } as StatesType;
      }
    }

    return state;
  };
}

export { useGetNexus, useSetNexus, useNexusAll, NexusProvider, ActionsMap };
