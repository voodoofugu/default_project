import React from "react";
import { useNexus, nexusUpdate } from "../../../nexus-state/src/nexus";

interface StyleTagProps {
  fileNames: string[];
  loadingElement?: React.ReactNode;
  children?: React.ReactNode;
}

type StyleData = Record<
  string,
  {
    fileNames?: string[];
    totalFiles?: number;
    stylesLoaded?: boolean;
  }
>;

const styleLoading = ({
  id,
  styleData,
}: {
  id: string;
  styleData: StyleData | null;
}) => {
  let stylesLoaded = false;
  if (styleData) {
    const styleObj = styleData[id];
    if (styleObj) {
      stylesLoaded = styleObj.stylesLoaded ?? false;
    }
  }
  return stylesLoaded;
};

const StyleTag = ({ fileNames, children }: StyleTagProps) => {
  const id = React.useId();
  const styleData = useNexus("styleData");

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
          if (state === null) return null;
          const { [id]: _, ...rest } = state;
          return rest;
        },
      });
    };
  }, [fileNames, id]);

  const stylesLoaded = styleLoading({ id, styleData });

  return stylesLoaded ? <>{children}</> : null;
};

export default StyleTag;
