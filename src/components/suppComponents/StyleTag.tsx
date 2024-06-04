import React from "react";
import { DynamicStyleProps } from "../hooks/useDynamicStyle";
import { selectors, useDispatch } from "../stateManage/GlobalStateStor";

const StyleTag: React.FC<DynamicStyleProps> = ({ parent, fileNames }) => {
  const styleData = selectors.useStyleData();
  const dispatch = useDispatch();

  let stylesLoaded = false;
  styleData.forEach((styleObj: any) => {
    if (styleObj.parent === parent) {
      stylesLoaded = styleObj.stylesLoaded;
    }
  });

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

  return null;
};

export default StyleTag;
