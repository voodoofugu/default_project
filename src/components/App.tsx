import React from "react";

// import { NexusProvider } from "nexus-state";
import { NexusProvider } from "../../nexus-state/src/nexus";

import { initialStates, initialFuncs } from "../../nexus/nexusConfig";

import Main from "./pageComponents/Main";
import Storage from "./suppComponents/Storage";

import StyleTagCore from "./suppComponents/StyleTagCore";

import { initializeState } from "./stateManager/globalStore";

// state
const initialState = { count: 0, count2: 0, boolean: true, name: "John" };
type InitialStatesT = typeof initialState;
declare global {
  interface IStatesT extends InitialStatesT {}
}
initializeState(initialState);

export default function App(): React.ReactElement {
  return (
    <NexusProvider initialStates={initialStates} initialFuncs={initialFuncs}>
      <Storage watch />
      <StyleTagCore />
      <Main />
    </NexusProvider>
  );
}
