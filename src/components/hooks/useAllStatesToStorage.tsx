import React from "react";
import useStore from "../stateManage/GlobalStateStor";

export default function useAllStatesToStorage() {
  const state = useStore();

  React.useEffect(() => {
    sessionStorage.setItem("initialStates", JSON.stringify(state));
  }, [state]);
}
