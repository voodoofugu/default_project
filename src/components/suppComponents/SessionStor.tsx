import React from "react";
import useStore from "../stateManage/GlobalStateStor";

interface SessionStorProps {
  storingAll?: boolean;
}

export default function SessionStor({
  storingAll = false,
}: SessionStorProps): React.ReactElement {
  const state = useStore();
  const storedStates = React.useMemo(() => {
    return Object.fromEntries(
      Object.entries(state).filter(([key]) => key.startsWith("s_"))
    );
  }, [state]);

  if (storingAll) {
    React.useEffect(() => {
      sessionStorage.setItem("🛠️ statesForWatch", JSON.stringify(state));
      sessionStorage.setItem("📌 storedStates", JSON.stringify(storedStates));
    }, [state]);
  } else {
    React.useEffect(() => {
      sessionStorage.setItem("📌 storedStates", JSON.stringify(storedStates));
    }, [storedStates]);
  }

  return null;
}
