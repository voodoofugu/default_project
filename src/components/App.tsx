import React from "react";

import { GlobalStateProvider } from "./stateManage/GlobalStateStor";

import StyleTagCore from "./suppComponents/StyleTagCore";
import Main from "./pageComponents/Main";

export default function App(): React.ReactElement {
  const [stylesLoaded, setStylesLoaded] = React.useState(false);

  const handleStylesLoaded = React.useCallback(() => {
    setStylesLoaded(true);
  }, []);

  return (
    <GlobalStateProvider sessionStor>
      <StyleTagCore onStylesLoaded={handleStylesLoaded} />
      {stylesLoaded ? <Main /> : "Loading..."}
    </GlobalStateProvider>
  );
}
