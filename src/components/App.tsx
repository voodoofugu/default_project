import React from "react";

// import { NexusProvider } from "nexus-state";
import { NexusProvider } from "./stateManager/nexus";

// import { initialStates, actions } from "./../../nexusConfig";

// import StyleTagCore from "./suppComponents/StyleTagCore";
import Main from "./pageComponents/Main";
import Storage from "./suppComponents/Storage";

export default function App(): React.ReactElement {
  return (
    <NexusProvider
    //  initialStates={initialStates} actions={actions}
    >
      <Storage watch />
      {/* <StyleTagCore /> */}
      <Main />
    </NexusProvider>
  );
}
