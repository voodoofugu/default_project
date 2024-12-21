import React from "react";
import { nexusUpdate, useNexus } from "../../../nexus-state/src/nexus";
import textToCamelcase from "../../scripts/textToCamelcase";

type StyleData = Record<
  string,
  {
    fileNames?: string[];
    stylesLoaded?: boolean;
  }
>;

type ImportStyleT = (fileName: string) => Promise<{ default: string }>;

const arraysEqual = (arr1: string[], arr2: string[]) =>
  arr1.length === arr2.length && arr1.every((v, i) => v === arr2[i]);

const clearStyles = ({
  id,
  fileNames,
}: {
  id: string;
  fileNames?: string[];
}) => {
  if (fileNames) {
    fileNames.forEach((el) => {
      const element = document.head.getElementsByClassName(el)[0];
      if (element) {
        document.head.removeChild(element);
      }
    });
  }
  if (id && !fileNames) {
    const escapedId = CSS.escape(id);
    const elements = document.head.querySelectorAll(`[id^='${escapedId}']`);
    elements.forEach((el) => {
      document.head.removeChild(el);
    });
  }
};

const createStateTag = (id: string, fileName: string) => {
  const classElem = textToCamelcase(fileName);
  let styleElement = document.getElementsByClassName(
    classElem
  )[0] as HTMLStyleElement;
  if (!styleElement) {
    styleElement = document.createElement("style");
    styleElement.id = id;
    styleElement.className = classElem;
    document.head.appendChild(styleElement);
  }

  return styleElement;
};

const loadStyles = async (
  styleObj: {
    [key: string]: { fileNames?: string[]; stylesLoaded?: boolean };
  },
  prevStyleData: { fileNames?: string[]; stylesLoaded?: boolean },
  importStyle: ImportStyleT
) => {
  const id = Object.keys(styleObj)[0];
  const { fileNames, stylesLoaded } = styleObj[id];

  if (!fileNames || fileNames.length === 0) {
    console.warn(`🚫 No files to load for id "${id}"`);
    return;
  }

  for (const fileName of fileNames) {
    const styleElement = createStateTag(id, fileName);
    try {
      const { default: cssData } = await importStyle(fileName);
      styleElement.textContent = cssData;
    } catch (error) {
      console.error(`🚫 Error loading style for ${fileName}:`, error);
      styleElement.textContent = "🚫";
    } finally {
      if (
        !prevStyleData ||
        !arraysEqual(prevStyleData?.fileNames || [], fileNames || []) ||
        !stylesLoaded
      ) {
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
    }
  }
};

const useDynamicStyle = (importStyle: ImportStyleT) => {
  const styleData = useNexus("styleData");

  const prevStyleArrayRef = React.useRef<StyleData>({});

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
      loadStyles({ [id]: styleData }, prevStyleData || {}, importStyle);

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
