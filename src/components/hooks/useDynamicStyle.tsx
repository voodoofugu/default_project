import { useEffect, useRef } from "react";
import textToCamelcase from "../../scripts/textToCamelcase";

const clearStyles = (fileNames: string[]) => {
  const existingStl = document.querySelectorAll(".dncStl");
  const existingIds = Array.from(existingStl).map((el) => el.id);

  existingIds.forEach((id) => {
    if (!fileNames.includes(id)) {
      const styleElement = document.getElementById(id);
      if (styleElement) {
        styleElement.parentNode.removeChild(styleElement);
      }
    }
  });
};

const loadStyles = async (fileNames: string[]) => {
  for (const fileName of fileNames) {
    const id = textToCamelcase(fileName);
    const filePath = `style/css/${fileName}.css`;

    let styleElement = document.getElementById(id);
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = id;
      styleElement.className = "dncStl";
      document.head.appendChild(styleElement);
    }

    try {
      const response = await fetch(filePath);
      const text = await response.text();
      if (!response.ok) {
        styleElement.textContent = "🚫";
      } else {
        styleElement.textContent = text;
      }
    } catch (error) {
      console.error(error);
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
