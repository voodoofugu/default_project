import React from "react";

const useOnce = (callback: () => void) => {
  const hasRun = React.useRef(false);

  if (!hasRun.current) {
    callback();
    hasRun.current = true;
  }
};

export default useOnce;
