import React from "react";
import { useAllStoreContext } from "../stateManager/store";

export interface StoringAllType {
  storingAll?: boolean;
}

interface SessionStorProps extends StoringAllType {}

export default function SessionStor({
  storingAll,
}: SessionStorProps): React.ReactElement {
  const states = useAllStoreContext();

  const { statesForWatch, storedStates } = React.useMemo(() => {
    const storedStates = Object.fromEntries(
      Object.entries(states).filter(([key]) => key.startsWith("s_"))
    );
    const statesForWatch = Object.fromEntries(
      Object.entries(states).filter(([key]) => !key.startsWith("s_"))
    );
    return { statesForWatch, storedStates };
  }, [states]);

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
