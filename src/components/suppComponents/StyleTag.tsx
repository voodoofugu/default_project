import React from "react";
import { DynamicStyleProps } from "../hooks/useDynamicStyle";
import { useDispatch } from "../stateManage/GlobalStateStor";

const StyleTag: React.FC<DynamicStyleProps> = ({ parent, fileNames }) => {
  const dispatch = useDispatch();

  const memoizedFileNames = React.useMemo(
    () => fileNames,
    [fileNames.join(",")]
  );

  // const hotReloadedFileNames = (): string[] => {
  //   let updatedFiles: string[] = [];

  //   if (module.hot) {
  //     module.hot.accept(
  //       fileNames.map((fileName) => `../../style/css/${fileName}.css`),
  //       (updatedModules) => {
  //         updatedModules.forEach((module) => {
  //           if (module && module.endsWith(".css")) {
  //             updatedFiles.push(module.split("/").pop()!.replace(".css", ""));
  //           }
  //         });
  //       }
  //     );
  //   }

  //   return updatedFiles;
  // };

  // React.useEffect(() => {
  //   const updatedFiles = hotReloadedFileNames();
  //   updatedFiles.forEach((updatedFile) => {
  //     dispatch({
  //       type: "STYLE_DATA",
  //       payload: {
  //         fileNames: [updatedFile],
  //       },
  //     });
  //   });
  // }, [hotReloadedFileNames]);

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
