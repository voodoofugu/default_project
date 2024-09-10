import React from "react";
import context from "./context";
// import initialStates from "./initialStates";
// import initialStates_requests from "./initialStates_requests";
// import reducer from "./reducer";
import Storage from "../suppComponents/Storage";
import { initialStates, reducer } from "../stateManager2/generateData";

// const combinedInitialStates = {
//   ...initialStates,
//   ...initialStates_requests,
// };

// const { ContextStoreProvider, useStoreContext, useAllStoreContext } = context(
//   combinedInitialStates,
//   reducer
// );
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

export { useNexus, useNexusAll, NexusProvider };
export default useNexus;
