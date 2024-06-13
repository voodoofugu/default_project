import { useState, useEffect } from "react";

const useAsyncData = (data: any) => {
  const [asyncData, setAsyncData] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const waitForData = (data: any) => {
      return new Promise((resolve) => {
        const check = () => {
          if (data !== null && data.length !== 0) {
            resolve(data);
          } else {
            requestAnimationFrame(check);
          }
        };
        check();
      });
    };

    waitForData(data).then((resolvedData) => {
      if (isMounted) {
        setAsyncData(resolvedData);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [data]);

  return asyncData;
};

export default useAsyncData;
