import React from "react";
import textToCamelcase from "../../scripts/textToCamelcase";
import { useDispatch } from "../stateManage/GlobalStateStor";

export interface DynamicStyleProps {
  parent?: string;
  fileNames: string[];
  styleLoaded?: boolean;
}

interface DynamicStyleArray {
  styleArray: DynamicStyleProps[];
}

export const clearStyles = ({ parent, fileNames }: DynamicStyleProps) => {
  const argsForRemove = document.head.querySelectorAll(`[${parent}="⚡"]`);
  const idsForRemove = Array.from(argsForRemove).map((el) => el.id);

  idsForRemove.forEach((id) => {
    const styleElement = document.getElementById(id);
    if (styleElement) {
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
  { parent, fileNames }: DynamicStyleProps,
  onLoad: (parent: string, totalFiles: number) => void
) => {
  for (const fileName of fileNames) {
    const styleElement = createStateTag(parent, fileName);
    try {
      const { default: text } = await import(`../../style/css/${fileName}.css`);
      styleElement.textContent = text;
      if (styleElement.textContent.length > 0) {
        onLoad(parent, fileNames.length);
      }
    } catch (error) {
      console.error(`🚫 Error loading style for ${fileName}:`, error);
      styleElement.textContent = "🚫";
    }
  }
};

const useDynamicStyle = ({ styleArray }: DynamicStyleArray) => {
  const dispatch = useDispatch();
  const prevStyleArrayRef = React.useRef<DynamicStyleProps[]>([]);

  const loadedFilesRef = React.useRef({ loadedFiles: 0 });

  const handleStyleLoad = React.useCallback(
    (parent: string, totalFiles: number) => {
      loadedFilesRef.current = { loadedFiles: 0 };
      loadedFilesRef.current.loadedFiles += 1;
      if (loadedFilesRef.current.loadedFiles === totalFiles) {
        dispatch({
          type: "STYLE_DATA",
          payload: {
            parent: parent,
            styleLoaded: true,
          },
        });
        console.log("🎉All styles from " + parent + " loaded");
      }
    },
    []
  );

  const emptyStyleArray = React.useCallback(() => {
    if (prevStyleArrayRef.current.length > 0) {
      prevStyleArrayRef.current.forEach((styleObj) => {
        clearStyles(styleObj);
      });
    }
  }, []);

  React.useEffect(() => {
    if (styleArray.length === 0) {
      emptyStyleArray();
    } else {
      styleArray.forEach((styleObj) => {
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
          if (prevStyleArrayRef.current.length > styleArray.length) {
            const removedObjects = prevStyleArrayRef.current.filter(
              (prevParent) => {
                return !styleArray.some(
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

      prevStyleArrayRef.current = styleArray;
    }
  }, [styleArray, emptyStyleArray, handleStyleLoad]);
};

export default useDynamicStyle;
