import React from "react";
import { DynamicStyleProps } from "../hooks/useDynamicStyle";
import { selectors, useDispatch } from "../stateManage/GlobalStateStor";

interface StyleTagProps extends DynamicStyleProps {
  children?: React.ReactNode;
  loadingElement?: React.ReactNode;
}

export const styleLoading = ({ parent }: DynamicStyleProps) => {
  const styleData = selectors.useStyleData();

  let stylesLoaded = false;
  styleData.forEach((styleObj: any) => {
    if (styleObj.parent === parent) {
      stylesLoaded = styleObj.stylesLoaded;
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
  const dispatch = useDispatch();

  const memoizedFileNames = React.useMemo(
    () => fileNames,
    [fileNames.join(",")]
  );

  React.useEffect(() => {
    dispatch({
      type: "STYLE_DATA",
      payload: {
        parent: parent,
        fileNames: memoizedFileNames,
      },
    });
  }, [parent, memoizedFileNames]);

  React.useEffect(() => {
    return () => {
      dispatch({
        type: "STYLE_DATA",
        payload: {
          parent: parent,
        },
      });
    };
  }, []);

  if (children) {
    return (
      <>
        {styleLoading({ parent: parent })
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
