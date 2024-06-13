import React from "react";
import context from "./context";
import initialStates from "./initialStates";
import reducer from "./reducer";
import SessionStor from "../suppComponents/SessionStor";

export const { ContextStoreProvider, useStoreContext, useAllStoreContext } =
  context(initialStates, reducer);

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
