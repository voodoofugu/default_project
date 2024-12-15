import React from "react";

// import { NexusProvider } from "nexus-state";
import { NexusProvider } from "../../nexus-state/src/nexus";

import { initialStates, initialFuncs } from "../../nexus/nexusConfig";

import Main from "./pageComponents/Main";
import Storage from "./suppComponents/Storage";

import StyleTagCore from "./suppComponents/StyleTagCore";

export default function App(): React.ReactElement {
  return (
    <NexusProvider initialStates={initialStates} initialFuncs={initialFuncs}>
      <Storage watch />
      <StyleTagCore />
      <Main />
    </NexusProvider>
  );
}
