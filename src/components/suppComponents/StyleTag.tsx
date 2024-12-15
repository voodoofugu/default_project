import React from "react";
import { useNexus, nexusUpdate } from "../../../nexus-state/src/nexus";

interface StyleTagProps {
  fileNames: string[];
  children?: React.ReactNode;
}

const StyleTag = ({ fileNames, children }: StyleTagProps) => {
  const styleData = useNexus("styleData");

  const id = React.useId();

  React.useEffect(() => {
    nexusUpdate({
      styleData: (state) => ({
        ...state,
        [id]: {
          ...state?.[id],
          fileNames,
        },
      }),
    });

    return () => {
      nexusUpdate({
        styleData: (state) => {
          if (!state) return null;
          const { [id]: unused, ...rest } = state; // eslint-disable-line @typescript-eslint/no-unused-vars
          return rest;
        },
      });
    };
  }, [fileNames, id]);

  const stylesLoaded = styleData?.[id]?.stylesLoaded ?? false;

  return stylesLoaded ? <>{children}</> : null;
};

export default StyleTag;
