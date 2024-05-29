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
  const styleElement =
    document.getElementById(id) || document.createElement("style");

  if (!document.getElementById(id)) {
    styleElement.id = id;
    styleElement.setAttribute(`${parent}`, "⚡");
    document.head.appendChild(styleElement);
  }

  return styleElement;
};

export const loadStyles = async (
  { parent, fileNames }: DynamicStyleProps,
  prevTextContentRef: React.MutableRefObject<{ [key: string]: string }>
) => {
  for (const fileName of fileNames) {
    const styleElement = createStateTag(parent, fileName);

    try {
      const { default: text } = await import(`../../style/css/${fileName}.css`);
      prevTextContentRef.current[styleElement.id] = text;
      console.log(
        "prevTextContentRef",
        prevTextContentRef.current[styleElement.id][0][1].length
      );
      console.log("text", text[0][1].length);

      if (!styleElement.textContent) {
        styleElement.textContent = text;
      } else {
        if (
          prevTextContentRef.current[styleElement.id][0][1].length !==
          text[0][1].length
        ) {
          console.log("loadStyles");
          styleElement.textContent = text;
          prevTextContentRef.current[styleElement.id] = text;
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

        loadStyles(styleObj, prevTextContentRef);

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
        } else if (
          prevParent &&
          prevParent.fileNames.length > styleObj.fileNames.length
        ) {
          const removedFileNames = prevParent.fileNames.filter(
            (fileName) => !styleObj.fileNames.includes(fileName)
          );

          removedFileNames.forEach((fileName) => {
            clearStyles({
              parent: styleObj.parent,
              fileNames: [fileName],
            });
          });
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
