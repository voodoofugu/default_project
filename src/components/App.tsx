import React from "react";

import { GlobalStateProvider } from "./stateManage/GlobalStateStor";
import { reducer, initialState } from "./stateManage/reducer";

import Main from "./pageComponents/Main";

export default function App(): React.ReactElement {
  const states = !!sessionStorage.getItem("initialStates")
    ? JSON.parse(sessionStorage.getItem("initialStates"))
    : initialState;

  // useStatesToStateStor("STYLE_DATA", "outputTailwind");

  return (
    <GlobalStateProvider reducer={reducer} initialState={states}>
      <Main />
    </GlobalStateProvider>
  );
}
