import React from "react";
import textToCamelcase from "../../scripts/textToCamelcase";

export interface DynamicStyleProps {
  parent: string;
  fileNames: string[];
}

interface DynamicStyleArray {
  styleArray: DynamicStyleProps[];
}

export const clearStyles = ({ parent, fileNames }: DynamicStyleProps) => {
  const existingStl = document.head.querySelectorAll(`[${parent}="⚡"]`);
  const existingArgs = Array.from(existingStl).map((el) => el.id);

  existingArgs.forEach((arg) => {
    const styleElement = document.getElementById(arg);
    if (styleElement) {
      if (!fileNames || !fileNames.includes(arg)) {
        styleElement.parentNode?.removeChild(styleElement);
      }
    }
  });
  console.log("Styles cleared");
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
      const prevStyle = prevStyleArrayRef.current.find(
        (s) => s.parent === styleObj.parent
      );
      loadStyles(styleObj, prevTextContentRef);
      if (prevStyle && prevStyle.fileNames.length > styleObj.fileNames.length) {
        clearStyles(prevStyle);
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
