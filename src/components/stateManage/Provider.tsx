import React from "react";
import context from "./context";
import initialStates from "./initialStates";
import initialState_requests from "./initialState_requests";
import reducer from "./reducer";
import SessionStor from "../suppComponents/SessionStor";

const combinedInitialStates = {
  ...initialStates,
  ...initialState_requests,
};

export const { ContextStoreProvider, useStoreContext, useAllStoreContext } =
  context(combinedInitialStates, reducer);

interface ProviderProps {
  storingAll?: boolean;
  children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = ({ storingAll, children }) => {
  return (
    <ContextStoreProvider>
      <SessionStor storingAll={storingAll} />
      {children}
    </ContextStoreProvider>
  );
};

export default Provider;
