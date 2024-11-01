import React from "react";
import { NexusStatesT } from "../stateManager/initialStates";
// import { useGetNexus, useAction } from "../stateManager/store";

interface StyleTagProps {
  parent: NexusStatesT["parent"];
  fileNames: NexusStatesT["fileNames"];
  children?: React.ReactNode;
  loadingElement?: React.ReactNode;
}

export const styleLoading = ({
  parent,
  styleData,
}: {
  parent: StyleTagProps["parent"];
  styleData: NexusStatesT["styleData"];
}) => {
  let stylesLoaded = false;
  styleData.forEach((styleObj) => {
    if (styleObj.parent === parent) {
      stylesLoaded = styleObj.stylesLoaded ?? false;
    }
  });

  return stylesLoaded ? true : false;
};

const StyleTag = ({
  // parent,
  // fileNames,
  children,
}: // loadingElement,
StyleTagProps) => {
  // const styleData = useGetNexus("styleData");

  // const memoizedFileNames = React.useMemo(
  //   () => fileNames,
  //   [fileNames.join(",")]
  // );

  // const setNexus = useAction();

  // React.useEffect(() => {
  //   setNexus({
  //     type: "STYLE_DATA",
  //     payload: {
  //       parent: parent,
  //       fileNames: memoizedFileNames,
  //     },
  //   });
  // }, [parent, memoizedFileNames]);

  // React.useEffect(() => {
  //   return () => {
  //     setNexus({
  //       type: "STYLE_DATA",
  //       payload: {
  //         parent: parent,
  //       },
  //     });
  //   };
  // }, [parent]);

  if (children) {
    return (
      <>
        {/* {styleLoading({ parent: parent, styleData: styleData })
          ? children
          : loadingElement
          ? loadingElement
          : null} */}
      </>
    );
  } else {
    return null;
  }
};

export default StyleTag;
