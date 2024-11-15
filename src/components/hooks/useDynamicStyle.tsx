import React from "react";
import { nexusDispatch } from "../../../nexus-state/src/nexus";

import { StyleData } from "../../../nexus/nexusConfig";
import textToCamelcase from "../../scripts/textToCamelcase";

export const clearStyles = ({ parent, fileNames }: StyleData) => {
  const argsForRemove = document.head.querySelectorAll(`[${parent}="⚡"]`);
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

const createStateTag = (parent: string, fileName: string) => {
  const id = textToCamelcase(fileName);
  let styleElement = document.getElementById(id) as HTMLStyleElement;
  if (!styleElement) {
    styleElement = document.createElement("style");
    styleElement.id = id;
    styleElement.setAttribute(`${parent}`, "⚡");
    document.head.appendChild(styleElement);
  }
  return styleElement;
};

const loadStyles = async (
  { parent, fileNames, stylesLoaded }: StyleData,
  onLoad: (parent: string, totalFiles: number, stylesLoaded: boolean) => void
) => {
  if (
    fileNames &&
    typeof stylesLoaded === "boolean" &&
    fileNames.length === 0
  ) {
    onLoad(parent, 0, stylesLoaded);
    console.log(`🚫 Array with the parent "${parent}" is empty`);
  } else if (fileNames && stylesLoaded) {
    for (const fileName of fileNames) {
      const styleElement = createStateTag(parent, fileName);
      try {
        const { default: text } = await import(
          `../../style/css/${fileName}.css`
        );
        styleElement.textContent = text;
        if (styleElement.textContent && styleElement.textContent.length > 0) {
          onLoad(parent, fileNames.length, stylesLoaded);
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
    parent: string,
    totalFiles: number,
    stylesLoaded: boolean
  ) => {
    console.log("handleStyleLoad");
    if (loadedFilesRef.current.loadedFiles === 0) {
      loadedFilesRef.current = { loadedFiles: 0 };
    }
    if (loadedFilesRef.current.loadedFiles < totalFiles) {
      loadedFilesRef.current.loadedFiles += 1;
    }
    if (
      totalFiles === 0 ||
      (loadedFilesRef.current.loadedFiles === totalFiles && !stylesLoaded)
    ) {
      nexusDispatch({
        type: "STYLE_DATA",
        payload: {
          parent: parent,
          stylesLoaded: true,
        },
      });
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

    if (styleData.length > 0) {
      loadStyleArray(styleData);
    }
  }, [styleData]);

  const loadStyleArray = (styleData: StyleData[]) => {
    styleData.forEach((styleObj) => {
      const prevParent = prevStyleArrayRef.current.find(
        (s) => s.parent === styleObj.parent
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
                (styleObj) => styleObj.parent === prevParent.parent
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
            parent: styleObj.parent,
            fileNames: removedFileNames,
          });
        } else if (removedFileNames.length > 0) {
          clearStyles({
            parent: styleObj.parent,
            fileNames: removedFileNames,
          });
        }
      }
    });

    prevStyleArrayRef.current = styleData;
  };
};

export default useDynamicStyle;
