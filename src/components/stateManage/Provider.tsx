import React from "react";
import context from "./context";
import initialStates from "./initialStates";
import reducer from "./reducer";

export const { ContextStoreProvider, useStoreContext } = context(
  initialStates,
  reducer
);

export default function Provider({ children }: { children: React.ReactNode }) {
  return <ContextStoreProvider>{children}</ContextStoreProvider>;
}
