import React from "react";
import { getState, setState, subscribe } from "./globalStore";
import deepCompare from "./deepCompare";

const useStore = <K extends keyof IStatesT>(
  state: K
): [
  IStatesT[K],
  (update: ((prevState: IStatesT[K]) => IStatesT[K]) | IStatesT[K]) => void
] => {
  // Получаем конкретное значение по ключу из глобального стора
  const stateRef = React.useRef<IStatesT[K]>(getState()[state]);

  const forceUpdate = React.useReducer(() => ({}), {})[1];

  // Подписываемся на изменения конкретного состояния
  React.useEffect(() => {
    const unsubscribe = subscribe<IStatesT[K]>(state, (newValue) => {
      if (!deepCompare(stateRef.current, newValue)) {
        stateRef.current = newValue;
        forceUpdate();
      }
    });

    return () => unsubscribe();
  }, [state]);

  // Обновляем конкретное состояние через setState
  const updateGlobalState = React.useCallback(
    (update: ((prevState: IStatesT[K]) => IStatesT[K]) | IStatesT[K]) => {
      const newState =
        typeof update === "function"
          ? (update as (prevState: IStatesT[K]) => IStatesT[K])(
              stateRef.current
            )
          : update;
      setState(state, newState);
    },
    [state]
  );

  return [stateRef.current, updateGlobalState];
};

export default useStore;
