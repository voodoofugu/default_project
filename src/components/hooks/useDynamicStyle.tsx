import { useEffect, useRef } from "react";
import textToCamelcase from "../../scripts/textToCamelcase";

const clearStyles = (fileNames: string[]) => {
  const existingStl = document.querySelectorAll(".dncStl");
  const existingIds = Array.from(existingStl).map((el) => el.id);

  existingIds.forEach((id) => {
    if (!fileNames.includes(id)) {
      const styleElement = document.getElementById(id);
      if (styleElement) {
        styleElement.parentNode?.removeChild(styleElement);
      }
    }
  });
};

const loadStyles = async (fileNames: string[]) => {
  for (const fileName of fileNames) {
    const id = textToCamelcase(fileName);
    const styleElement =
      document.getElementById(id) || document.createElement("style");

    if (!document.getElementById(id)) {
      styleElement.id = id;
      styleElement.className = "dncStl";
      document.head.appendChild(styleElement);
    }

    try {
      const { default: text } = await import(`../../style/css/${fileName}.css`);
      styleElement.textContent = text;
    } catch (error) {
      console.error(error);
      styleElement.textContent = "🚫";
    }
  }
};

export default function useDynamicStyle(fileNames: string[]) {
  const prevFileNamesRef = useRef<string[]>([]);

  useEffect(() => {
    const prevFileNames = prevFileNamesRef.current;

    loadStyles(fileNames);
    if (prevFileNames.length > fileNames.length) {
      clearStyles(fileNames);
    }

    prevFileNamesRef.current = fileNames;
  }, [fileNames]);
}
