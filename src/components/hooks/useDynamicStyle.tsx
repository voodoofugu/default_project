import React from "react";
import { InitialStatesType } from "../stateManager/initialStates";
import textToCamelcase from "../../scripts/textToCamelcase";

export interface DynamicStyleArray {
  styleData: InitialStatesType["styleData"];
  setStyleData: (value: { type: string; payload: any }) => void;
}

export const clearStyles = ({
  parent,
  fileNames,
}: InitialStatesType["styleData"][0]) => {
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

export const createStateTag = (parent: string, fileName: string) => {
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

export const loadStyles = async (
  { parent, fileNames, stylesLoaded }: InitialStatesType["styleData"][0],
  onLoad: (parent: string, totalFiles: number, stylesLoaded: boolean) => void
) => {
  if (fileNames.length === 0) {
    onLoad(parent, 0, stylesLoaded);
    console.log(`🚫 Array with the parent "${parent}" is empty`);
  } else {
    for (const fileName of fileNames) {
      const styleElement = createStateTag(parent, fileName);
      try {
        const { default: text } = await import(
          `../../style/css/${fileName}.css`
        );
        styleElement.textContent = text;
        if (styleElement.textContent.length > 0) {
          onLoad(parent, fileNames.length, stylesLoaded);
        }
      } catch (error) {
        console.error(`🚫 Error loading style for ${fileName}:`, error);
        styleElement.textContent = "🚫";
      }
    }
  }
};

const useDynamicStyle = ({ styleData, setStyleData }: DynamicStyleArray) => {
  const prevStyleArrayRef = React.useRef<InitialStatesType["styleData"]>([]);
  const loadedFilesRef = React.useRef({ loadedFiles: 0 });

  const handleStyleLoad = (
    parent: string,
    totalFiles: number,
    stylesLoaded: boolean
  ) => {
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
      setStyleData({
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

  const loadStyleArray = (styleData: InitialStatesType["styleData"]) => {
    styleData.forEach((styleObj) => {
      const prevParent = prevStyleArrayRef.current.find(
        (s) => s.parent === styleObj.parent
      );

      let removedFileNames: string[] = [];
      if (prevParent) {
        removedFileNames = prevParent.fileNames.filter(
          (fileName) => !styleObj.fileNames.includes(fileName)
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
        } else if (prevParent.fileNames.length > styleObj.fileNames.length) {
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
