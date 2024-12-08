import React from "react";
import { nexusUpdate } from "../../../nexus-state/src/nexus";
import textToCamelcase from "../../scripts/textToCamelcase";

type StyleData = Record<
  string,
  {
    fileNames?: string[];
    totalFiles?: number;
    stylesLoaded?: boolean;
  }
>;

export const clearStyles = ({
  id,
  fileNames,
}: {
  id: string;
  fileNames?: string[];
}) => {
  const escapedId = CSS.escape(id);
  const argsForRemove = document.head.querySelectorAll(`[id='${escapedId}']`);
  const idsForRemove = Array.from(argsForRemove).map((el) => el.id);

  idsForRemove.forEach((id) => {
    const styleElement = document.getElementById(id);
    console.log("styleElement", styleElement);
    if (!fileNames && styleElement) {
      styleElement.parentNode?.removeChild(styleElement);
    }

    if (styleElement && fileNames && Array.isArray(fileNames)) {
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
    document.head.appendChild(styleElement);
  }

  return styleElement;
};

const loadStyles = async (
  styleObj: { [key: string]: { fileNames?: string[]; stylesLoaded?: boolean } },
  onLoad: (id: string, totalFiles: number, stylesLoaded: boolean) => void
) => {
  const id = Object.keys(styleObj)[0];
  const { fileNames, stylesLoaded } = styleObj[id];

  if (!fileNames || fileNames.length === 0) {
    onLoad(id, 0, stylesLoaded ?? false);
    console.log(`🚫 Array with the id "${id}" is empty`);
    return;
  }

  let loadedCount = 0;

  for (const fileName of fileNames) {
    const styleElement = createStateTag(id, fileName);
    try {
      const { default: text } = await import(`../../style/css/${fileName}.css`);
      styleElement.textContent = text;
    } catch (error) {
      console.error(`🚫 Error loading style for ${fileName}:`, error);
      styleElement.textContent = "🚫";
    } finally {
      loadedCount += 1;
      if (loadedCount === fileNames.length) {
        onLoad(id, fileNames.length, true);
      }
    }
  }
};

const useDynamicStyle = (styleData: StyleData | null) => {
  const prevStyleArrayRef = React.useRef<StyleData>({});
  const loadedFilesRef = React.useRef({ loadedFiles: 0 });

  const emptyStyleArray = () => {
    Object.keys(prevStyleArrayRef.current).forEach((id) => {
      clearStyles({ id });
    });
  };

  React.useEffect(() => {
    emptyStyleArray();
    if (styleData && Object.keys(styleData).length > 0) {
      loadStyleObject(styleData);
    }
  }, [styleData]);

  const loadStyleObject = (styleData: StyleData) => {
    Object.entries(styleData).forEach(([id, styleObj]) => {
      const prevObj = prevStyleArrayRef.current[id];

      let removedFileNames: string[] = [];
      if (prevObj) {
        const prevFileNames = prevObj.fileNames || [];
        const newFileNames = styleObj.fileNames || [];
        removedFileNames = prevFileNames.filter(
          (fileName) => !newFileNames.includes(fileName)
        );
      }

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
          nexusUpdate({
            styleData: (state) => ({ ...state, [id]: { stylesLoaded: true } }),
          });
        }
      };

      // Теперь передаем в loadStyles объект с ключом id и значением, соответствующим типу
      loadStyles({ [id]: styleObj }, handleStyleLoad);

      if (prevObj && removedFileNames.length > 0) {
        clearStyles({ id, fileNames: removedFileNames });
      }
    });

    prevStyleArrayRef.current = { ...styleData };
  };
};

export default useDynamicStyle;
