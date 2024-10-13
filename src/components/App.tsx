import React from "react";

import StyleTagCore from "./suppComponents/StyleTagCore";
import Main from "./pageComponents/Main";

import { NexusProvider } from "./stateManager/store";
import { initialStates, actions } from "../../nexusConfig";

export default function App(): React.ReactElement {
  return (
    <NexusProvider watch>
      {/* <StyleTagCore /> */}
      <Main />
    </NexusProvider>
  );
}
