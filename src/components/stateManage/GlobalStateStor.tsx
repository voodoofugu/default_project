import { ReactNode, Dispatch } from "react";
import { useImmerReducer } from "use-immer";
import { createContext, useContextSelector } from "use-context-selector";
import { reducer, initialState, InitialState, Action } from "./reducer";
import SessionStor from "../suppComponents/SessionStor";

type GlobalStateContextType = [InitialState, Dispatch<Action>];
interface GlobalStateProviderProps {
  sessionStor?: boolean;
  children: ReactNode;
}

const GlobalStateContext = createContext<GlobalStateContextType | undefined>(
  undefined
);

function generateSelectors(state: InitialState) {
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

export const selectors = generateSelectors(initialState);

export function useDispatch() {
  return useContextSelector(GlobalStateContext, (context) => context?.[1]);
}

export function GlobalStateProvider({
  sessionStor,
  children,
}: GlobalStateProviderProps) {
  const states = !!sessionStorage.getItem("initialStates")
    ? JSON.parse(sessionStorage.getItem("initialStates"))
    : initialState;

  const contextValue = useImmerReducer(
    reducer,
    sessionStor ? states : initialState
  );

  return (
    <GlobalStateContext.Provider value={contextValue}>
      {sessionStor && <SessionStor />}
      {children}
    </GlobalStateContext.Provider>
  );
}
