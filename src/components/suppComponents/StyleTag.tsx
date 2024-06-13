import React from "react";
import { InitialStatesType } from "../stateManage/initialStates";
import { useStoreContext } from "../stateManage/Provider";

interface StyleTagProps {
  parent: InitialStatesType["parent"];
  fileNames: InitialStatesType["fileNames"];
  children?: React.ReactNode;
  loadingElement?: React.ReactNode;
}

export const styleLoading = ({
  parent,
  styleData,
}: {
  parent: StyleTagProps["parent"];
  styleData: InitialStatesType["styleData"];
}) => {
  console.log(styleData);
  let stylesLoaded = false;
  styleData.forEach((styleObj) => {
    if (styleObj.parent === parent) {
      stylesLoaded = styleObj.stylesLoaded ?? false;
    }
  });

  return stylesLoaded ? true : false;
};

const StyleTag = ({
  parent,
  fileNames,
  children,
  loadingElement,
}: StyleTagProps) => {
  const [styleData, setStyleData] =
    useStoreContext<InitialStatesType["styleData"]>("styleData");

  const memoizedFileNames = React.useMemo(
    () => fileNames,
    [fileNames.join(",")]
  );

  React.useEffect(() => {
    setStyleData({
      type: "STYLE_DATA",
      payload: {
        parent: parent,
        fileNames: memoizedFileNames,
      },
    });
  }, [parent, memoizedFileNames, setStyleData]);

  React.useEffect(() => {
    return () => {
      setStyleData({
        type: "STYLE_DATA",
        payload: {
          parent: parent,
        },
      });
    };
  }, [parent, setStyleData]);

  if (children) {
    return (
      <>
        {styleLoading({ parent: parent, styleData: styleData })
          ? children
          : loadingElement
          ? loadingElement
          : "Loading..."}
      </>
    );
  } else {
    return null;
  }
};

export default StyleTag;
