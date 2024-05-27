import React from "react";
import useStore from "../stateManage/GlobalStateStor";

export default function SessionStor(): React.ReactElement {
  const state = useStore();
  const stateMemo = React.useMemo(() => state, [state]);

  React.useEffect(() => {
    sessionStorage.setItem("initialStates", JSON.stringify(stateMemo));
  }, [stateMemo]);

  return null;
}
