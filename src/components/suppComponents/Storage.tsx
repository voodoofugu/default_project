import React from "react";
import { useNexusAll } from "../stateManager/store";

export interface watchType {
  watch?: boolean;
}

interface SessionStorProps extends watchType {}

export default function Storage({
  watch,
}: SessionStorProps): React.ReactElement {
  const states = useNexusAll();

  const { statesForWatch, localStates, sessionStates } = React.useMemo(() => {
    const localStates = Object.fromEntries(
      Object.entries(states).filter(([key]) => key.endsWith("_l"))
    );
    const sessionStates = Object.fromEntries(
      Object.entries(states).filter(([key]) => key.endsWith("_s"))
    );
    const statesForWatch = Object.fromEntries(
      Object.entries(states).filter(
        ([key]) => !key.endsWith("_s") && !key.endsWith("_l")
      )
    );
    return { statesForWatch, localStates, sessionStates };
  }, [states]);

  if (watch) {
    React.useEffect(() => {
      localStorage.setItem("📌", JSON.stringify(localStates));
      sessionStorage.setItem("📌", JSON.stringify(sessionStates));
      sessionStorage.setItem("👀", JSON.stringify(statesForWatch));
    }, [statesForWatch, sessionStates]);
  } else {
    React.useEffect(() => {
      localStorage.setItem("📌", JSON.stringify(localStates));
      sessionStorage.setItem("📌", JSON.stringify(sessionStates));
    }, [sessionStates]);
  }

  return null;
}
