import React from "react";

// import { NexusProvider } from "nexus-state";
import { NexusProvider } from "./stateManager/store";

import { initialStates, actions, InitialStatesType } from "./../../nexusConfig";

// import StyleTagCore from "./suppComponents/StyleTagCore";
import Main from "./pageComponents/Main";
import Storage from "./suppComponents/Storage";

export default function App(): React.ReactElement {
  return (
    <NexusProvider<InitialStatesType>
      initialStates={initialStates}
      actions={actions}
    >
      <Storage watch />
      {/* <StyleTagCore /> */}
      <Main />
    </NexusProvider>
  );
}
