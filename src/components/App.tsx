import React from "react";

// import { NexusProvider } from "nexus-state";
import { NexusProvider } from "../../nexus-state/src/nexus";

import { initialStates, initialFuncs } from "../../nexus/nexusConfig";

import Main from "./pageComponents/Main";
import Storage from "./suppComponents/Storage";

import StyleCore from "../../styled-atom/src/StyleCore";

import { initializeState } from "./stateManager/globalStore";

// state
const initialState = {
  count: 0,
};
type InitialStatesT = typeof initialState;
declare global {
  interface IStatesT extends InitialStatesT {}
}
initializeState(initialState);

export default function App(): React.ReactElement {
  return (
    <NexusProvider initialStates={initialStates} initialFuncs={initialFuncs}>
      <Storage watch />
      <StyleCore
        watch
        path={(name: string) => import(`../../src/style/css/${name}.css`)}
      />
      <Main />
    </NexusProvider>
  );
}
