import React from "react";
import { DynamicStyleProps } from "../hooks/useDynamicStyle";
import { useDispatch } from "../stateManage/GlobalStateStor";

const StyleTag: React.FC<DynamicStyleProps> = ({ parent, fileNames }) => {
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

  return null;
};

export default StyleTag;
