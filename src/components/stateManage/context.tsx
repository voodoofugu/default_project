import React from "react";
import { Action } from "./reducer";

export default function context<Context>(
  initialState: Context,
  reducer: (state: Context, action: Action) => Context
) {
  function useStatesContextData(): {
    get: () => Context;
    set: (value: Partial<Context>) => void;
    subscribe: (callback: () => void) => () => void;
  } {
    const store = React.useRef(initialState);

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

  function ContextStoreProvider({
    children,
  }: Readonly<{ children: React.ReactNode }>) {
    return (
      <StatesContext.Provider value={useStatesContextData()}>
        {children}
      </StatesContext.Provider>
    );
  }

  function useStatesContext<SelectorOutput>(
    selector: (store: Context) => SelectorOutput
  ): [SelectorOutput, (value: Partial<Context> | Action) => void] {
    const statesContext = React.useContext(StatesContext);
    if (!statesContext) {
      throw new Error("Store not found");
    }

    const state = React.useSyncExternalStore(
      statesContext.subscribe,
      () => selector(statesContext.get()),
      () => selector(initialState)
    );

    const set = (value: Partial<Context> | Action) => {
      if ("type" in value) {
        const newState = reducer(statesContext.get(), value as Action);
        statesContext.set(newState);
      } else {
        statesContext.set(value as Partial<Context>);
      }
    };

    return [state, set];
  }

  function useStoreContext<SelectorOutput>(
    fieldName: string
  ): [SelectorOutput, (value: any) => void] {
    const [getter, setter] = useStatesContext(
      (fc) => (fc as Record<string, SelectorOutput>)[fieldName]
    );
    return [getter, setter];
  }

  function useAllStoreContext(): Context {
    const [statesContext] = useStatesContext((fc) => fc);
    return statesContext;
  }

  return {
    ContextStoreProvider,
    useStoreContext,
    useAllStoreContext,
  };
}
