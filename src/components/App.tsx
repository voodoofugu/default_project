import React from "react";

import StyleTagCore from "./suppComponents/StyleTagCore";
import Main from "./pageComponents/Main";

import { useNexusAll, NexusProvider } from "./stateManager/store";

export default function App(): React.ReactElement {
  return (
    <NexusProvider watch>
      {/* <StyleTagCore /> */}
      <Main />
    </NexusProvider>
  );
}
