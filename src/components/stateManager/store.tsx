import React from "react";
import context from "./context";
import Storage from "../suppComponents/Storage";

interface Config {
  initialStates: Record<string, any>;
  actions: Record<
    string,
    {
      reducer?: (state: any, action: any) => any;
    }
  >;
}

let initialStates: Config["initialStates"] = {};
let actions: Config["actions"] = {};

// Функция конфигурации
function configureNexus(config: Config): void {
  initialStates = config.initialStates;
  actions = config.actions;
}

// Редьюсер, использующий действия из конфигурации
function reducerNexus(
  state: any,
  action: { type: string; payload?: any }
): any {
  const type = action.type as keyof typeof actions;
  const payload = action.payload;

  if (actions[type]) {
    const config = actions[type] as {
      initialState: any;
      reducer?: (state: any, action: any) => any;
    };

    if (config.reducer) {
      return {
        ...state,
        ...config.reducer(state, action),
      };
    } else {
      return {
        ...state,
        ...payload,
      };
    }
  }

  return state;
}

// Создаём контекст, используя начальные состояния и редьюсер
const { useNexus, useNexusAll, NexusContextProvider } = context(
  initialStates,
  reducerNexus
);

interface ProviderProps {
  watch?: boolean;
  children: React.ReactNode;
}

// NexusProvider принимает конфигурацию состояний и редьюсера
const NexusProvider: React.FC<ProviderProps> = ({ watch, children }) => {
  return (
    <NexusContextProvider>
      <Storage watch={watch} />
      {children}
    </NexusContextProvider>
  );
};

// Экспортируем хуки и провайдер
export { useNexus, useNexusAll, NexusProvider, configureNexus };
export default useNexus;
