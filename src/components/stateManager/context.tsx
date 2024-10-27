import React from "react";

export type ActionType<T = any> = {
  type: string;
  payload?: T;
};

export default function context<Context extends Record<string, any>>(
  initialStates: Context,
  reducer: (state: Context, action: ActionType) => Context
) {
  function useStatesContextData(): {
    get: () => Context;
    set: (value: Partial<Context>) => void;
    subscribe: (callback: () => void) => () => void;
  } {
    const store = React.useRef(initialStates);

    const get = React.useCallback(() => store.current, []);

    const subscribers = React.useRef(new Set<() => void>());

    const set = React.useCallback((value: Partial<Context>) => {
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
  function useGetNexus<K extends keyof Context>(stateName: K): Context[K] {
    const statesContext = React.useContext(StatesContext);

    if (!(stateName in statesContext.get())) {
      console.error(`State "${String(stateName)}" in useGetNexus not found 👺`);
    }

    return React.useSyncExternalStore(
      statesContext.subscribe,
      () => statesContext.get()[stateName] ?? initialStates[stateName],
      () => initialStates[stateName]
    );
  }

  function useSelector<K extends keyof Context>(
    selector: (state: Context) => Context[K]
  ): Context[K] {
    const statesContext = React.useContext(StatesContext);
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
  function useSetNexus(): (value: Partial<Context> | ActionType) => void {
    const statesContext = React.useContext(StatesContext);

    return (value: Partial<Context> | ActionType) => {
      if ("type" in value) {
        const newState = reducer(statesContext.get(), value as ActionType);
        statesContext.set(newState);
      } else {
        statesContext.set(value as Partial<Context>);
      }
    };
  }

  // Для получения всего состояния
  function useNexusAll(): Context {
    const statesContext = React.useContext(StatesContext);

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
