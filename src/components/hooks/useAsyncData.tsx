import { useState, useEffect } from "react";

const useAsyncData = (
  asyncFunction: () => Promise<any>,
  dependencies: any[]
) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    asyncFunction()
      .then((result) => {
        if (isMounted) {
          setData(result);
          setLoading(false);
        }
      })
      .catch((error) => {
        if (isMounted) {
          console.error(error);
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, dependencies);

  return { data, loading };
};

export default useAsyncData;
