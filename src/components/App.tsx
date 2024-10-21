import React from "react";

// import StyleTagCore from "./suppComponents/StyleTagCore";
import Main from "./pageComponents/Main";

import { initialStates, actions, InitialStatesType } from "./../../nexusConfig";
import { NexusProvider } from "./stateManager/store";

export default function App(): React.ReactElement {
  return (
    <NexusProvider<InitialStatesType>
      initialStates={initialStates}
      actions={actions}
      watch
    >
      {/* <StyleTagCore /> */}
      <Main />
    </NexusProvider>
  );
}
