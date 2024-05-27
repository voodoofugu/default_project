import React from "react";
import textToCamelcase from "../../scripts/textToCamelcase";

export interface DynamicStyleProps {
  parent?: string;
  fileNames: string[];
}

interface DynamicStyleArray {
  styleArray: DynamicStyleProps[];
}

export const clearStyles = ({ parent, fileNames }: DynamicStyleProps) => {
  console.log("clearStyles2", parent, fileNames);
  const argsForRemove = document.head.querySelectorAll(`[${parent}="⚡"]`);
  const idsForRemove = Array.from(argsForRemove).map((el) => el.id);

  idsForRemove.forEach((id) => {
    const styleElement = document.getElementById(id);
    if (styleElement) {
      styleElement.parentNode?.removeChild(styleElement);
    }
  });
};

const loadStyles = async (
  { parent, fileNames }: DynamicStyleProps,
  prevTextContentRef: React.MutableRefObject<{ [key: string]: string }>
) => {
  for (const fileName of fileNames) {
    const id = textToCamelcase(fileName);
    const styleElement =
      document.getElementById(id) || document.createElement("style");

    if (!document.getElementById(id)) {
      styleElement.id = id;
      styleElement.setAttribute(`${parent}`, "⚡");
      document.head.appendChild(styleElement);
    }

    try {
      const { default: text } = await import(`../../style/css/${fileName}.css`);
      prevTextContentRef.current[id] = text;

      if (!styleElement.textContent) {
        styleElement.textContent = text;
      } else {
        if (prevTextContentRef.current[id] !== text) {
          styleElement.textContent = text;
          prevTextContentRef.current[id] = text;
        }
      }
    } catch (error) {
      console.error(error);
      styleElement.textContent = "🚫";
    }
  }
};

const useDynamicStyle = ({ styleArray }: DynamicStyleArray) => {
  const prevStyleArrayRef = React.useRef<DynamicStyleProps[]>(styleArray);
  const prevTextContentRef = React.useRef<{ [key: string]: string }>({});

  React.useEffect(() => {
    styleArray.forEach((styleObj) => {
      const prevParent = prevStyleArrayRef.current.find(
        (s) => s.parent === styleObj.parent
      );

      loadStyles(styleObj, prevTextContentRef);

      if (prevParent && prevStyleArrayRef.current.length > styleArray.length) {
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
      }

      if (
        prevParent &&
        prevParent.fileNames.length > styleObj.fileNames.length
      ) {
        const removedFileNames = prevParent.fileNames.filter(
          (fileName) => !styleObj.fileNames.includes(fileName)
        );
        console.log("removedFileNames", removedFileNames);

        removedFileNames.forEach((fileName) => {
          clearStyles({
            parent: styleObj.parent,
            fileNames: [fileName],
          });
        });
      }
    });

    prevStyleArrayRef.current = styleArray;
  }, [styleArray]);

  // React.useEffect(() => {
  //   return () => {
  //     prevStyleArrayRef.current.forEach((styleObj) => {
  //       clearStyles({
  //         parent: styleObj.parent,
  //         fileNames: null,
  //       });
  //     });
  //   };
  // }, []);
};

export default useDynamicStyle;
