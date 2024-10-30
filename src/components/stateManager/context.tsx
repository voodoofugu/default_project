import React from "react";
import { A } from "./loadUserConfig";

export default function context<S extends Record<keyof S, any>>(
  initialStates: S,
  reducer: (state: S, action: A) => S
) {
  function useStatesContextData(): {
    get: () => S;
    set: (value: Partial<S>) => void;
    subscribe: (callback: () => void) => () => void;
  } {
    const store = React.useRef(initialStates);
    const subscribers = React.useRef(new Set<() => void>());

    const get = React.useCallback(() => store.current, []);

    const set = React.useCallback((value: Partial<S>) => {
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

  type UseStatesContextDataReturnType = ReturnType<typeof useStatesContextData>;

  const StatesContext =
    React.createContext<UseStatesContextDataReturnType | null>(null);

  function NexusContextProvider({
    children,
  }: Readonly<{ children: React.ReactNode }>) {
    return (
      <StatesContext.Provider value={useStatesContextData()}>
        {children}
      </StatesContext.Provider>
    );
  }

  // Хук для получения состояния по ключу
  function useGetNexus<K extends keyof S>(stateName: K): S[K] {
    const statesContext = React.useContext(StatesContext);

    // Проверяем, существует ли контекст
    if (!statesContext) {
      throw new Error("NexusContextProvider not found 👺");
    }

    if (!(stateName in statesContext.get())) {
      console.error(`State "${String(stateName)}" in useGetNexus not found 👺`);
    }

    return React.useSyncExternalStore(
      statesContext.subscribe,
      () => statesContext.get()[stateName] ?? initialStates[stateName],
      () => initialStates[stateName]
    );
  }

  function useSelector<K extends keyof S>(selector: (state: S) => S[K]): S[K] {
    const statesContext = React.useContext(StatesContext);

    // Проверяем, существует ли контекст
    if (!statesContext) {
      throw new Error("NexusContextProvider not found 👺");
    }

    const state = statesContext.get();

    // Проверяем, существует ли выбранное значение
    if (selector(state) === undefined) {
      console.error("State in useSelector not found 👺");
    }

    return React.useSyncExternalStore(
      statesContext.subscribe,
      () => selector(statesContext.get()),
      () => selector(initialStates)
    );
  }

  // Хук для обновления состояния по ключу или dispatch action
  function useSetNexus(): (value: Partial<S> | A) => void {
    const statesContext = React.useContext(StatesContext);

    // Проверяем, существует ли контекст
    if (!statesContext) {
      throw new Error("NexusContextProvider not found 👺");
    }

    return (value: Partial<S> | A) => {
      if ("type" in value) {
        const newState = reducer(statesContext.get(), value as A);
        statesContext.set(newState);
      } else {
        statesContext.set(value as Partial<S>);
      }
    };
  }

  // Для получения всего состояния
  function useNexusAll(): S {
    const statesContext = React.useContext(StatesContext);

    // Проверяем, существует ли контекст
    if (!statesContext) {
      throw new Error("NexusContextProvider not found 👺");
    }

    return React.useSyncExternalStore(
      statesContext.subscribe,
      statesContext.get,
      () => initialStates
    );
  }

  return {
    useGetNexus,
    useSetNexus,
    useNexusAll,
    useSelector,
    NexusContextProvider,
  };
}
