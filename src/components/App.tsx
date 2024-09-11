import React from "react";

import StyleTagCore from "./suppComponents/StyleTagCore";
import Main from "./pageComponents/Main";

import {
  NexusProvider,
  configureNexus,
  useNexusAll,
} from "./stateManager/store";
import { initialStates, actions } from "./stateManager2/nexusConfig";
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
