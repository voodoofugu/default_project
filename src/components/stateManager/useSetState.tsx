import React from "react";
import { initializeState } from "./globalStore";

import deepCompare from "./deepCompare";

function useSetState<T extends Record<string, any>>(initialState: T) {
  const isInitialized = React.useRef({});

  React.useLayoutEffect(() => {
    if (!deepCompare(initialState, isInitialized.current)) {
      initializeState(initialState);
      isInitialized.current = initialState;
    }

    return () => {
      isInitialized.current = {};
      initializeState({});
    };
  }, [initialState]);
}

export default useSetState;
