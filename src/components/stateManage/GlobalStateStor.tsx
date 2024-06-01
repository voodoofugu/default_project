import { ReactNode, Dispatch } from "react";
import { useImmerReducer } from "use-immer";
import { createContext, useContextSelector } from "use-context-selector";
import { reducer, Action } from "./reducer";
import initialState, { InitialStateType } from "./initialState";
import initialState_s, { InitialState_s } from "./initialState_storeSaved";
import SessionStor from "../suppComponents/SessionStor";

type GlobalStateContextType = [InitialStateType, Dispatch<Action>];
interface GlobalStateProviderProps {
  storingAll?: boolean;
  children: ReactNode;
}

const GlobalStateContext = createContext<GlobalStateContextType | undefined>(
  undefined
);

type CombinedStateType = InitialStateType & InitialState_s;

function generateSelectors(state: CombinedStateType) {
  const selectors: { [key: string]: () => any } = {};

  Object.keys(state).forEach((key) => {
    selectors[`use${key.charAt(0).toUpperCase() + key.slice(1)}`] = () =>
      useContextSelector(GlobalStateContext, (context) => context?.[0][key]);
  });

  return selectors;
}

export default function useStore() {
  return useContextSelector(GlobalStateContext, (context) => context?.[0]);
}

const combinedState = {
  ...initialState,
  ...initialState_s,
};
export const selectors = generateSelectors(combinedState);

export function useDispatch() {
  return useContextSelector(GlobalStateContext, (context) => context?.[1]);
}

export function GlobalStateProvider({
  storingAll,
  children,
}: GlobalStateProviderProps) {
  const states = !!sessionStorage.getItem("combinedState")
    ? JSON.parse(sessionStorage.getItem("combinedState"))
    : combinedState;

  const contextValue = useImmerReducer(
    reducer,
    storingAll ? states : initialState_s
  );

  return (
    <GlobalStateContext.Provider value={contextValue}>
      <SessionStor />
      {children}
    </GlobalStateContext.Provider>
  );
}
