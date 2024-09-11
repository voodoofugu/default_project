import React from "react";

import StyleTagCore from "./suppComponents/StyleTagCore";
import Main from "./pageComponents/Main";

import {
  useNexusAll,
  NexusProvider,
  configureNexus,
} from "./stateManager/store";
import { initialStates, actions } from "./stateManager/nexusConfig";
configureNexus({ initialStates, actions });

export default function App(): React.ReactElement {
  // console.log("useNexusAll", useNexusAll());

  return (
    <NexusProvider watch>
      {/* <StyleTagCore /> */}
      <Main />
    </NexusProvider>
  );
}
