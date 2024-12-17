import React from "react";
import { getState, setState, subscribe } from "./globalStore";
import deepCompare from "./deepCompare";

const useStore = (state: string) => {
  // Получаем конкретное значение по ключу из глобального стора
  const stateRef = React.useRef(getState()[state]);

  const forceUpdate = React.useReducer(() => ({}), {})[1];

  // Подписываемся на изменения конкретного состояния
  React.useEffect(() => {
    const unsubscribe = subscribe(state, (newValue) => {
      if (!deepCompare(stateRef.current, newValue)) {
        stateRef.current = newValue;
        forceUpdate();
      }
    });

    return () => unsubscribe();
  }, [state]);

  // Обновляем конкретное состояние через setState
  const updateGlobalState = React.useCallback(
    (update: ((prevState: any) => any) | any) => {
      const newState =
        typeof update === "function" ? update(stateRef.current) : update;
      setState(state, newState);
    },
    [state]
  );

  return [stateRef.current, updateGlobalState];
};

export default useStore;
