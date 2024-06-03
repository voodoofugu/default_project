import React from "react";
import useStore from "../stateManage/GlobalStateStor";

interface SessionStorProps {
  storingAll?: boolean;
}

export default function SessionStor({
  storingAll = false,
}: SessionStorProps): React.ReactElement {
  const state = useStore();
  const { statesForWatch, storedStates } = React.useMemo(() => {
    const storedStates = Object.fromEntries(
      Object.entries(state).filter(([key]) => key.startsWith("s_"))
    );
    const statesForWatch = Object.fromEntries(
      Object.entries(state).filter(([key]) => !key.startsWith("s_"))
    );
    return { statesForWatch, storedStates };
  }, [state]);

  if (storingAll) {
    React.useEffect(() => {
      sessionStorage.setItem(
        "🛠️ statesForWatch",
        JSON.stringify(statesForWatch)
      );
      sessionStorage.setItem("📌 storedStates", JSON.stringify(storedStates));
    }, [statesForWatch, storedStates]);
  } else {
    React.useEffect(() => {
      sessionStorage.setItem("📌 storedStates", JSON.stringify(storedStates));
    }, [storedStates]);
  }

  return null;
}
