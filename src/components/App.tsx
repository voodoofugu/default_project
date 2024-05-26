import React from "react";

import { GlobalStateProvider } from "./stateManage/GlobalStateStor";

import StyleTagCore from "./suppComponents/StyleTagCore";
import Main from "./pageComponents/Main";

export default function App(): React.ReactElement {
  return (
    <GlobalStateProvider sessionStor>
      <StyleTagCore />
      <Main />
    </GlobalStateProvider>
  );
}
