import React from "react";
import { ActionsType, ActionsRT, NexusContextT } from "./types";

export default function createReducer(actions: ActionsRT) {
  return function reducerNexus(state: StatesT, action: ActionsType): StatesT {
    const actionType = action.type;
    const payload = action.payload;

    if (actions[actionType]) {
      const config = actions[actionType];

      if (config.reducer) {
        return config.reducer(state, action);
      } else {
        return {
          ...state,
          ...payload,
        } as StatesT;
      }
    }

    return state;
  };
}

function getContextMethods(initialStates: StatesT): {
  get: () => StatesT;
  set: (value: Partial<StatesT>) => void;
  subscribe: (callback: () => void) => () => void;
} {
  const store = React.useRef(initialStates);
  const subscribers = React.useRef(new Set<() => void>());

  const get = React.useCallback(() => store.current, []);
  const set = React.useCallback((value: Partial<StatesT>) => {
    store.current = { ...store.current, ...value };
    subscribers.current.forEach((callback) => callback());
  }, []);
  const subscribe = React.useCallback((callback: () => void) => {
    subscribers.current.add(callback);
    return () => subscribers.current.delete(callback);
  }, []);

  return {
    get,
    set,
    subscribe,
  };
}

// Создание значений контекста
function createContextValue(
  initialStates: StatesT,
  reducer: (state: StatesT, action: ActionsType) => StatesT
) {
  const stateData = getContextMethods(initialStates);

  function get<K extends keyof StatesT>(stateName: K): StatesT[K] {
    if (!(stateName in stateData.get())) {
      console.error(`State "${String(stateName)}" in useNexus not found 👺`);
    }

    return React.useSyncExternalStore(
      stateData.subscribe,
      () => stateData.get()[stateName] ?? initialStates[stateName],
      () => initialStates[stateName]
    );
  }

  function selector<K extends keyof StatesT>(
    select: (state: StatesT) => StatesT[K]
  ): StatesT[K] {
    const state = stateData.get();
    if (select(state) === undefined) {
      console.error("State in useSelector not found 👺");
    }

    return React.useSyncExternalStore(
      stateData.subscribe,
      () => select(stateData.get()),
      () => select(initialStates)
    );
  }

  function dispatch(action: ActionsType): void {
    const currentState = stateData.get();
    const newState = reducer(currentState, action);
    if (currentState !== newState) {
      stateData.set(newState);
    }
  }

  function getAll(): StatesT {
    return React.useSyncExternalStore(
      stateData.subscribe,
      stateData.get,
      () => initialStates
    );
  }

  return {
    get,
    dispatch,
    getAll,
    selector,
    subscribe: stateData.subscribe,
  };
}

// Создание контекста
const NexusContext = React.createContext<NexusContextT | null>(null);

let nexusDispatchRef: ((action: ActionsType) => void) | null = null;
const NexusProvider: React.FC<{
  initialStates: StatesT;
  actions: ActionsRT;
  children: React.ReactNode;
}> = ({ initialStates, actions, children }) => {
  const reducer = createReducer(actions);
  const contextValue = {
    ...createContextValue(initialStates, reducer),
    initialStates, // добавляем initialStates в контекст
  };

  nexusDispatchRef = contextValue.dispatch;

  return (
    <NexusContext.Provider value={contextValue}>
      {children}
    </NexusContext.Provider>
  );
};

// Функция проверки существования контекста
function contextExist(): NexusContextT {
  const ctx = React.useContext(NexusContext);
  if (!ctx) {
    throw new Error("NexusProvider not found 👺");
  }
  return ctx;
}

// Хуки
function useNexus<K extends keyof StatesT>(stateName: K): StatesT[K];
function useNexus(): StatesT;
function useNexus(stateName?: keyof StatesT) {
  const ctx = contextExist();
  return stateName ? ctx.get(stateName) : ctx.getAll();
}

const useSelector = <K extends keyof StatesT>(
  selector: (state: StatesT) => StatesT[K]
): StatesT[K] => {
  const ctx = contextExist();

  const memoizedSelector = React.useCallback(selector, [selector]);

  return React.useSyncExternalStore(
    ctx.subscribe,
    () => memoizedSelector(ctx.getAll()),
    () => memoizedSelector(ctx.initialStates)
  );
};

// functions
function nexusDispatch(action: { type: keyof ActionsT; payload?: any }): void {
  if (!nexusDispatchRef) {
    throw new Error(
      "nexusDispatch is not initialized. Make sure NexusProvider is used 👺"
    );
  }
  nexusDispatchRef(action);
}

function createAction(
  reducer?: (state: StatesT, action: ActionsType) => StatesT
) {
  return { reducer };
}

export { NexusProvider, useNexus, useSelector, nexusDispatch, createAction };
