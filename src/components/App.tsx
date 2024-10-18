import React from "react";

import StyleTagCore from "./suppComponents/StyleTagCore";
import Main from "./pageComponents/Main";

import { initialStates, actions } from "./../../nexusConfig";
import { useNexusAll, NexusProvider } from "./stateManager/store";

export default function App(): React.ReactElement {
  return (
    <NexusProvider initialStates={initialStates} actions={actions} watch>
      {/* <StyleTagCore /> */}
      <Main />
    </NexusProvider>
  );
}
