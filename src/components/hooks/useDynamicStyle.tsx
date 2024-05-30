import React from "react";
import textToCamelcase from "../../scripts/textToCamelcase";
import CryptoJS from "crypto-js";

export interface DynamicStyleProps {
  parent?: string;
  fileNames: string[];
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
        if (styleElement.getAttribute("id") !== fileName) {
          console.log("Cleared styleElement", styleElement);
          styleElement.parentNode?.removeChild(styleElement);
        }
      }
    }
  });
};

export const createStateTag = (parent: string, fileName: string) => {
  const id = textToCamelcase(fileName);
  const styleElement =
    document.getElementById(id) || document.createElement("style");

  if (!document.getElementById(id)) {
    styleElement.id = id;
    styleElement.setAttribute(`${parent}`, "⚡");
    document.head.appendChild(styleElement);
  }

  return styleElement;
};

export const loadStyles = async ({ parent, fileNames }: DynamicStyleProps) => {
  for (const fileName of fileNames) {
    const styleElement = createStateTag(parent, fileName);

    try {
      const { default: text } = await import(`../../style/css/${fileName}.css`);
      styleElement.textContent = text;
    } catch (error) {
      console.error(`🚫 Error loading style for ${fileName}:`, error);
      styleElement.textContent = "🚫";
    }
  }

  // if (!prevStyleObjRef.current) {
  //   prevStyleObjRef.current = fileNames;
  // } else {
  //   const removedStyles = prevStyleObjRef.current.filter(
  //     (prevFileName) => !fileNames.includes(prevFileName)
  //   );

  //   if (removedStyles.length > 0) {
  //     clearStyles({ parent, fileNames: removedStyles });
  //   }

  //   prevStyleObjRef.current = fileNames;
  //   console.log("removedStyles:", removedStyles);
  // }
};

const useDynamicStyle = ({ styleArray }: DynamicStyleArray) => {
  const prevStyleArrayRef = React.useRef<DynamicStyleProps[]>(styleArray);

  function amptyStyleArray() {
    if (prevStyleArrayRef.current.length > 0) {
      prevStyleArrayRef.current.forEach((styleObj) => {
        clearStyles(styleObj);
      });
    }
  }

  React.useEffect(() => {
    if (styleArray.length === 0) {
      amptyStyleArray();
    } else {
      styleArray.forEach((styleObj) => {
        const prevParent = prevStyleArrayRef.current.find(
          (s) => s.parent === styleObj.parent
        );

        loadStyles(styleObj);

        if (
          prevParent &&
          prevStyleArrayRef.current.length > styleArray.length
        ) {
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
          const removedFileNames = prevParent.fileNames.filter(
            (fileName) => !styleObj.fileNames.includes(fileName)
          );

          removedFileNames.forEach((fileName) => {
            clearStyles({
              parent: styleObj.parent,
              fileNames: [fileName],
            });
          });
        } else {
          prevStyleArrayRef.current.filter((prevFileName) => {
            return !styleArray.some(
              (styleObj) => styleObj.parent === prevParent.parent
            );
          });
          // TODO : оопиши условие если именя стиля изменилось, но массивы нет
        }
      });

      prevStyleArrayRef.current = styleArray;
    }
  }, [styleArray]);

  // React.useEffect(() => {
  //   return () => {
  //     amptyStyleArray();
  //   };
  // }, []);
};

export default useDynamicStyle;
