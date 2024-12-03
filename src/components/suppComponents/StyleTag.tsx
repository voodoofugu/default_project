import React from "react";
import { useNexus } from "../../../nexus-state/src/nexus";

import { StyleData } from "../../../nexus/actions/STYLE_DATA";

interface StyleTagProps {
  fileNames: StyleData["fileNames"];
  loadingElement?: React.ReactNode;
  children?: React.ReactNode;
}

const styleLoading = ({
  id,
  styleData,
}: {
  id: string;
  styleData: StyleData[];
}) => {
  let stylesLoaded = false;
  styleData.forEach((styleObj) => {
    if (styleObj.id === id) {
      stylesLoaded = styleObj.stylesLoaded ?? false;
    }
  });

  return stylesLoaded ? true : false;
};

const StyleTag = ({ fileNames, children }: StyleTagProps) => {
  const id = React.useId();
  const styleData = useNexus("styleData");

  const memoizedFileNames = React.useMemo(() => fileNames, [fileNames]);

  React.useEffect(() => {
    // nexusEffect({
    //   type: "STYLE_DATA",
    //   payload: {
    //     id: id,
    //     fileNames: memoizedFileNames,
    //   },
    // });

    return () => {
      // nexusEffect({
      //   type: "STYLE_DATA",
      //   payload: {
      //     id: id,
      //   },
      // });
    };
  }, [memoizedFileNames]);

  const stylesLoaded = styleLoading({ id, styleData });

  return stylesLoaded ? <>{children}</> : null;
};

export default StyleTag;
