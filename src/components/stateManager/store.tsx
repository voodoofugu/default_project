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

// Значения по умолчанию на случай отсутствия nexusConfig
let initialStatesLocal: Config["initialStates"] = {};
let actionsLocal: Config["actions"] = {};
let nexusConfig;

// Проверяем, доступен ли объект process (если да, значит код выполняется в Node.js)
if (typeof process !== "undefined" && process?.cwd) {
  // Серверное окружение (Node.js)
  try {
    nexusConfig = require(require.resolve("nexusConfig", {
      paths: [process.cwd()],
    }));
    initialStatesLocal = nexusConfig.initialStates || {};
    actionsLocal = nexusConfig.actions || {};
  } catch (e) {
    if (e.code === "MODULE_NOT_FOUND") {
      console.warn(
        "nexusConfig не найден, используются значения по умолчанию."
      );
    } else {
      throw e; // Если ошибка не связана с отсутствием модуля, пробрасываем её
    }
  }
} else {
  // Клиентское окружение (браузер)
  console.warn("Запуск в браузере, nexusConfig не загружен.");
}

// Редьюсер, использующий действия из конфигурации
function reducerNexus(
  state: any,
  action: { type: string; payload?: any }
): any {
  const type = action.type as keyof typeof actionsLocal;
  const payload = action.payload;

  if (actionsLocal[type]) {
    const config = actionsLocal[type] as {
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
  initialStatesLocal,
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
export { useNexus, useNexusAll, NexusProvider };
export default useNexus;
