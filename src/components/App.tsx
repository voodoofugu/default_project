import React from "react";

import { Provider } from "./stateManager/store";
import StyleTagCore from "./suppComponents/StyleTagCore";
import Main from "./pageComponents/Main";

export default function App(): React.ReactElement {
  return (
    <Provider storingAll>
      <StyleTagCore />
      <Main />
    </Provider>
  );
}
