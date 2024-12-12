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

const clearStyles = ({
  id,
  fileNames,
}: {
  id: string;
  fileNames?: string[];
}) => {
  const escapedId = CSS.escape(id);
  const elements = document.head.querySelectorAll(`[id^='${escapedId}']`);

  elements.forEach((el) => {
    if (!fileNames || fileNames.includes(el.id)) {
      el.remove();
    }
  });
};

const createStateTag = (id: string, fileName: string) => {
  const idElement = textToCamelcase(fileName);
  let styleElement = document.getElementById(id) as HTMLStyleElement;
  if (!styleElement) {
    styleElement = document.createElement("style");
    styleElement.id = id;
    styleElement.className = idElement;
    document.head.appendChild(styleElement);
  }

  return styleElement;
};

const loadStyles = async (
  styleObj: {
    [key: string]: { fileNames?: string[]; stylesLoaded?: boolean };
  },
  prevStyleData: StyleData
) => {
  console.log("loadStyles");
  const id = Object.keys(styleObj)[0];
  const { fileNames } = styleObj[id];

  const arraysEqual = (arr1: string[], arr2: string[]) =>
    arr1.length === arr2.length && arr1.every((v, i) => v === arr2[i]);

  const onLoad = (id: string, totalFiles: number) => {
    console.log("id", id);
    const styleObj = prevStyleData?.[id];
    console.log("styleObj", styleObj);
    if (styleObj?.fileNames?.length === totalFiles) {
      nexusUpdate({
        styleData: (state) => ({
          ...state,
          [id]: {
            ...state?.[id],
            stylesLoaded: true,
          },
        }),
      });
    }
  };

  if (!fileNames || fileNames.length === 0) {
    console.warn(`🚫 No files to load for id "${id}"`);
    return;
  }

  console.log(
    "arraysEqual(prevStyleData[id].fileNames || [], fileNames || [])",
    arraysEqual(prevStyleData[id]?.fileNames || [], fileNames || [])
  );
  for (const fileName of fileNames) {
    const styleElement = createStateTag(id, fileName);
    try {
      const { default: text } = await import(`../../style/css/${fileName}.css`);
      styleElement.textContent = text;
    } catch (error) {
      console.error(`🚫 Error loading style for ${fileName}:`, error);
      styleElement.textContent = "🚫";
    } finally {
      if (
        !prevStyleData?.[id] ||
        !arraysEqual(prevStyleData[id].fileNames || [], fileNames || [])
      ) {
        onLoad(id, fileNames.length);
      }
    }
  }
};

const useDynamicStyle = (styleData: StyleData | null) => {
  const prevStyleArrayRef = React.useRef<StyleData>(styleData ?? {});

  const loadStyleObject = (styleData: StyleData) => {
    Object.entries(styleData).forEach(([id, styleData]) => {
      const prevStyleData = prevStyleArrayRef.current[id];

      let removedFileNames: string[] = [];
      if (prevStyleData) {
        const prevFileNames = prevStyleData.fileNames || [];
        const newFileNames = styleData.fileNames || [];
        removedFileNames = prevFileNames.filter(
          (fileName) => !newFileNames.includes(fileName)
        );
      }

      // Теперь передаем в loadStyles объект с ключом id и значением, соответствующим типу
      loadStyles({ [id]: styleData }, { prevStyleData });

      if (prevStyleData && removedFileNames.length > 0) {
        clearStyles({ id, fileNames: removedFileNames });
      }
    });
  };

  React.useEffect(() => {
    const prevIds = Object.keys(prevStyleArrayRef.current);
    const currentIds = styleData ? Object.keys(styleData) : [];
    const removedIds = prevIds.filter((id) => !currentIds.includes(id));

    removedIds.forEach((id) => clearStyles({ id }));

    if (styleData) {
      loadStyleObject(styleData);
    }

    prevStyleArrayRef.current = { ...styleData };
  }, [styleData]);
};

export default useDynamicStyle;
