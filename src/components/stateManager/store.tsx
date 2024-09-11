import React from "react";
import context from "./context";
// import initialStates from "./initialStates";
// import initialStates_requests from "./initialStates_requests";
// import reducer from "./reducer";
import Storage from "../suppComponents/Storage";
// import { initialStates, reducer } from "../stateManager2/generateData";

// const combinedInitialStates = {
//   ...initialStates,
//   ...initialStates_requests,
// };

// const { ContextStoreProvider, useStoreContext, useAllStoreContext } = context(
//   combinedInitialStates,
//   reducer
// );

interface Config {
  initialStates: Record<string, any>;
  actions: Record<
    string,
    {
      reducer?: (state: any, action: any) => any;
    }
  >;
}

function configureNexus(config: Config): void {
  initialStates = config.initialStates;
  actions = config.actions;
}
let initialStates: Config["initialStates"] = {};
let actions: Config["actions"] = {};

function reducer(state: any, action: { type: string; payload?: any }): any {
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

const { useNexus, useNexusAll, NexusContextProvider } = context(
  initialStates,
  reducer
);

interface ProviderProps {
  watch?: boolean;
  children: React.ReactNode;
}

const NexusProvider: React.FC<ProviderProps> = ({ watch, children }) => {
  return (
    <NexusContextProvider>
      <Storage watch={watch} />
      {children}
    </NexusContextProvider>
  );
};

export { useNexus, useNexusAll, NexusProvider, configureNexus };
export default useNexus;
