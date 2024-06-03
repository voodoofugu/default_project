import { useEffect, useState, ComponentType, ReactNode } from "react";

const loadFile = async (filePath: string): Promise<ComponentType<any>> => {
  try {
    const file = await import(`../uiComponents/${filePath}`);
    return file.default;
  } catch (error) {
    console.error("🚫 Error loading file:", error);
    throw error;
  }
};

export default function useDynamicLoad(
  filePath: string,
  componentProps: Record<string, any> = {}
): ReactNode {
  const [Component, setComponent] = useState<ComponentType<any> | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const load = async () => {
      try {
        const loadedFile = await loadFile(filePath);
        setComponent(() => loadedFile);
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

  return Component ? <Component {...componentProps} /> : null;
}
