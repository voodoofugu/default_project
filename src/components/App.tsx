import React from "react";

import { NexusProvider } from "./stateManager/store";
import StyleTagCore from "./suppComponents/StyleTagCore";
import Main from "./pageComponents/Main";

export default function App(): React.ReactElement {
  return (
    <NexusProvider watch>
      <StyleTagCore />
      <Main />
    </NexusProvider>
  );
}
