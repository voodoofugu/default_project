import React from "react";

// import { NexusProvider } from "nexus-state";
import { NexusProvider } from "../../nexus-state/src/nexus";

import { initialStates, initialFuncs } from "../../nexus/nexusConfig";

import Main from "./pageComponents/Main";
import Storage from "./suppComponents/Storage";

import StyleTagCore from "./suppComponents/StyleTagCore";

import { initializeState } from "./stateManager/globalStore";

export default function App(): React.ReactElement {
  initializeState({ count: 0 });

  return (
    <NexusProvider initialStates={initialStates} initialFuncs={initialFuncs}>
      <Storage watch />
      <StyleTagCore />
      <Main />
    </NexusProvider>
  );
}
