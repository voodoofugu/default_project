import React from "react";
import { useNexus, nexusDispatch } from "../../../nexus-state/src/nexus";

import { StyleData } from "../../../nexus/nexusConfig";

interface StyleTagProps {
  parent: StyleData["parent"];
  fileNames: StyleData["fileNames"];
  loadingElement?: React.ReactNode;
  children?: React.ReactNode;
}

const styleLoading = ({
  parent,
  styleData,
}: {
  parent: StyleTagProps["parent"];
  styleData: StyleData[];
}) => {
  let stylesLoaded = false;
  styleData.forEach((styleObj) => {
    if (styleObj.parent === parent) {
      stylesLoaded = styleObj.stylesLoaded ?? false;
    }
  });

  return stylesLoaded ? true : false;
};

const StyleTag = ({ parent, fileNames, children }: StyleTagProps) => {
  const styleData = useNexus("styleData");

  const memoizedFileNames = React.useMemo(
    () => fileNames,
    [fileNames.join(",")]
  );

  React.useEffect(() => {
    nexusDispatch({
      type: "STYLE_DATA",
      payload: {
        parent: parent,
        fileNames: memoizedFileNames,
      },
    });
  }, [parent, memoizedFileNames]);

  React.useEffect(() => {
    return () => {
      nexusDispatch({
        type: "STYLE_DATA",
        payload: {
          parent: parent,
        },
      });
    };
  }, [parent]);

  if (children) {
    return (
      <>
        {styleLoading({ parent: parent, styleData: styleData })
          ? children
          : null}
      </>
    );
  } else {
    return null;
  }
};

export default StyleTag;
