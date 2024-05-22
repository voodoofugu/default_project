import { useEffect, useState, ComponentType, ReactNode } from "react";

const loadFile = async (filePath: string) => {
  try {
    const file = await import(`../${filePath}`);
    return file.default;
  } catch (error) {
    console.error("🚫 Error loading file:", error);
    throw error;
  }
};

export default function useDynamicLoad(filePath: string): ReactNode {
  const [file, setFile] = useState<null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const load = async () => {
      try {
        const loadedFile = await loadFile(filePath);
        setFile(loadedFile);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [filePath]);

  if (isLoading) {
    return <div>🔄️</div>;
  }

  if (error) {
    console.error(error);
    return <div>🚫</div>;
  }

  return file;
}
