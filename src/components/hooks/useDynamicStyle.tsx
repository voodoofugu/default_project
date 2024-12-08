import React from "react";
// import { nexusTrigger } from "../../../nexus-state/src/nexus";

import textToCamelcase from "../../scripts/textToCamelcase";
import { StyleData } from "../../../nexus/actions/STYLE_DATA";

export const clearStyles = ({ id, fileNames }: StyleData) => {
  console.log("clearStyles");
  const escapedId = CSS.escape(id);
  const argsForRemove = document.head.querySelectorAll(`[id="${escapedId}"]`);
  const idsForRemove = Array.from(argsForRemove).map((el) => el.id);

  idsForRemove.forEach((id) => {
    const styleElement = document.getElementById(id);
    if (styleElement && fileNames) {
      for (const fileName of fileNames) {
        if (styleElement.getAttribute("id") === fileName) {
          styleElement.parentNode?.removeChild(styleElement);
        }
      }
    }
  });
};

const createStateTag = (id: string, fileName: string) => {
  const idElement = textToCamelcase(fileName);
  let styleElement = document.getElementById(id) as HTMLStyleElement;
  if (!styleElement) {
    styleElement = document.createElement("style");
    styleElement.id = idElement;
    styleElement.setAttribute("id", `${id}`);
    document.head.appendChild(styleElement);
  }
  return styleElement;
};

const loadStyles = async (
  { id, fileNames, stylesLoaded }: StyleData,
  onLoad: (id: string, totalFiles: number, stylesLoaded: boolean) => void
) => {
  console.log("loadStyles");
  if (
    fileNames &&
    typeof stylesLoaded === "boolean" &&
    fileNames.length === 0
  ) {
    onLoad(id, 0, stylesLoaded);
    console.log(`🚫 Array with the id "${id}" is empty`);
  } else if (fileNames && typeof stylesLoaded === "boolean") {
    for (const fileName of fileNames) {
      const styleElement = createStateTag(id, fileName);
      try {
        const { default: text } = await import(
          `../../style/css/${fileName}.css`
        );
        styleElement.textContent = text;
        if (styleElement.textContent && styleElement.textContent.length > 0) {
          onLoad(id, fileNames.length, stylesLoaded);
        }
      } catch (error) {
        console.error(`🚫 Error loading style for ${fileName}:`, error);
        styleElement.textContent = "🚫";
      }
    }
  }
};

const useDynamicStyle = (styleData: StyleData[]) => {
  const prevStyleArrayRef = React.useRef<StyleData[]>([]);
  const loadedFilesRef = React.useRef({ loadedFiles: 0 });

  const handleStyleLoad = (
    id: string,
    totalFiles: number,
    stylesLoaded: boolean
  ) => {
    if (loadedFilesRef.current.loadedFiles < totalFiles) {
      loadedFilesRef.current.loadedFiles += 1;
    }

    if (
      totalFiles === 0 ||
      (loadedFilesRef.current.loadedFiles === totalFiles && !stylesLoaded)
    ) {
      // nexusTrigger({
      //   type: "STYLE_DATA",
      //   payload: {
      //     id: id,
      //     stylesLoaded: true,
      //   },
      // });
    }
  };

  const emptyStyleArray = () => {
    if (prevStyleArrayRef.current.length > 0) {
      prevStyleArrayRef.current.forEach((styleObj) => {
        clearStyles(styleObj);
      });
    }
  };

  React.useEffect(() => {
    emptyStyleArray();

    if (styleData && styleData.length > 0) {
      loadStyleArray(styleData);
    }
  }, [styleData]);

  const loadStyleArray = (styleData: StyleData[]) => {
    styleData.forEach((styleObj) => {
      const prevParent = prevStyleArrayRef.current.find(
        (s) => s.id === styleObj.id
      );

      let removedFileNames: string[] = [];
      if (prevParent && prevParent.fileNames) {
        removedFileNames = prevParent.fileNames.filter(
          (fileName) => !styleObj.fileNames!.includes(fileName) // Утверждаем, что fileNames не undefined
        );
      }

      loadStyles(styleObj, handleStyleLoad);

      if (prevParent) {
        if (prevStyleArrayRef.current.length > styleData.length) {
          const removedObjects = prevStyleArrayRef.current.filter(
            (prevParent) => {
              return !styleData.some(
                (styleObj) => styleObj.id === prevParent.id
              );
            }
          );
          removedObjects.forEach((removedObject) => {
            clearStyles(removedObject);
          });
        } else if (
          prevParent.fileNames &&
          styleObj.fileNames &&
          prevParent.fileNames.length > styleObj.fileNames.length
        ) {
          clearStyles({
            id: styleObj.id,
            fileNames: removedFileNames,
          });
        }
        if (removedFileNames.length > 0) {
          clearStyles({
            id: styleObj.id,
            fileNames: removedFileNames,
          });
        }
      }
    });

    prevStyleArrayRef.current = [...styleData];
  };
};

export default useDynamicStyle;
